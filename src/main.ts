
// get the .bel file
// go through each line and read the commands

  // @import load that file 
    // if it's a .bel do the bell things
    // if its a .ts then do that
    // if its .json then save it

  // @export save the var to the export map

  // @url save the url
  // @body save the body
  // @header save the header

  // @write save to a file
  // @log log whatever

  // _ = _, define a variable in the map

  // POST GET ... send the request we've built

  // # ignore comment lines

  // unrecognized command, throw an error
  // improperly formatted command, throw an error
  // unrecognized variable, throw an error

// if there are no reasons to not log, log the response
// at the end of the file, clear the variable map
// export the export map