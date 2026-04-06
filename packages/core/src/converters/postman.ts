import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

interface PostmanItem {
  name: string;
  item?: PostmanItem[];
  request?: {
    method: string;
    header: Array<{ key: string; value: string; disabled?: boolean }>;
    body?: {
      mode: string;
      raw?: string;
      options?: {
        raw?: {
          language?: string;
        };
      };
    };
    url: {
      raw: string;
      host: string[];
      path: string[];
      query?: Array<{ key: string; value: string; disabled?: boolean }>;
    } | string;
  };
}

interface PostmanCollection {
  info: {
    name: string;
  };
  item: PostmanItem[];
}

export function convertPostmanToBell(postmanJsonPath: string, outputDir: string) {
  let content: string;
  try {
    content = fs.readFileSync(postmanJsonPath, 'utf8');
  } catch (err: any) {
    throw new Error(`Failed to read file: ${err.message}`);
  }

  let collection: PostmanCollection;
  try {
    collection = JSON.parse(content);
  } catch (err: any) {
    throw new Error(`Failed to parse Postman collection JSON: ${err.message}`);
  }

  if (!collection.item || !Array.isArray(collection.item)) {
    throw new Error('Invalid Postman collection: Missing "item" array.');
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(chalk.gray(`  Collection: ${chalk.bold(collection.info?.name || 'Unnamed')}`));
  processItems(collection.item, outputDir);
}

function processItems(items: PostmanItem[], currentDir: string) {
  for (const item of items) {
    if (item.item) {
      // It's a folder
      const nextDir = path.join(currentDir, sanitizeName(item.name));
      if (!fs.existsSync(nextDir)) {
        fs.mkdirSync(nextDir, { recursive: true });
      }
      processItems(item.item, nextDir);
    } else if (item.request) {
      // It's a request
      const bellContent = convertRequestToBell(item);
      const fileName = `${sanitizeName(item.name)}.${item.request.method}.bel`;
      fs.writeFileSync(path.join(currentDir, fileName), bellContent);
    }
  }
}

function sanitizeName(name: string): string {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

function convertRequestToBell(item: PostmanItem): string {
  const req = item.request!;
  let bell = `###\nRequest: ${item.name}\n###\n\n`;

  // URL
  const urlRaw = typeof req.url === 'string' ? req.url : req.url.raw;
  // Convert Postman variables {{var}} to Bell variables {var}
  const bellUrl = urlRaw.replace(/\{\{([^}]+)\}\}/g, '{$1}');
  
  bell += `url "${bellUrl}"\n\n`;

  // Headers
  const activeHeaders = req.header.filter(h => !h.disabled);
  if (activeHeaders.length > 0) {
    bell += 'headers {\n';
    activeHeaders.forEach(h => {
      const key = h.key.includes('-') ? `"${h.key}"` : h.key;
      const value = h.value.replace(/\{\{([^}]+)\}\}/g, '{$1}');
      // Use template literals if there's interpolation
      const formattedValue = value.includes('{') ? `\`${value}\`` : `"${value}"`;
      bell += `  ${key}: ${formattedValue}\n`;
    });
    bell += '}\n\n';
  }

  // Body
  if (req.body && req.body.mode === 'raw' && req.body.raw) {
    let rawBody = req.body.raw;
    // Replace variables in body
    rawBody = rawBody.replace(/\{\{([^}]+)\}\}/g, '{$1}');
    
    // Unescape common control characters for a cleaner multi-line display in Bell
    const cleanBody = rawBody.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
    
    try {
      // If it's JSON, try to format it a bit or just output it
      const json = JSON.parse(cleanBody);
      bell += `body ${JSON.stringify(json, null, 2)}\n\n`;
    } catch (e) {
      // Not JSON or has template syntax that makes it invalid JSON
      bell += "body `\n" + cleanBody + "\n`\n\n";
    }
  }

  // Method
  bell += `${req.method}\n`;

  return bell;
}
