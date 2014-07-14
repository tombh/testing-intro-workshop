function replaceAt(string, index, replacement) {
  // Get the string from the beginning up to index
  var beginning = string.substr(0, index);
  // Get the string from the character after index to the end
  var end = string.substr(index + 1);
  // Glue the pieces together
  return  beginning + replacement + end;
}

// Find the word 'cat' hidden in a string
function findCat(string){
  var cat = ['c', 'a', 't'];
  // Pop off the first letter from the cat array
  var looking_for = cat.shift();
  // Iterate over every character
  for (var i = 0, len = string.length; i < len; i++) {
    // If the current character doesn't match the searched-for character replace it with an underscore
    if(string[i] != looking_for){
      string = replaceAt(string, i, '_');
    }else{
      // There was a match so get the next character to look for
      looking_for = cat.shift();
    }
  }
  return string;
}

function bestCatRepo(callback){
  $.ajax({
    url: "https://api.github.com/search/repositories?q=cat&sort=stars&order=desc"
  }).done(function(data) {
    callback(data.items[0]);
  });
}
