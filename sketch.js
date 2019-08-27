var txt = [];
var counts = {};
var keys = [];
var allwords = [];

var files = ['file3.txt','file2.txt','file1.txt', 'laptop.txt', 'lenevo.txt'];

function preload() {
  for (var i = 0; i < files.length; i++) {
    txt[i] = loadStrings('files/' + files[i]);
  }
}

function setup() {
  for (var i = 0; i < txt.length; i++) {
    allwords[i] = txt[i].join("\n");
  }

  var tokens = allwords[0].split(/\W+/);
  for (var i = 0; i < tokens.length; i++) {
    var word = tokens[i].toLowerCase();
    if (counts[word] === undefined) {
      counts[word] = {
        tf: 1,
        df: 1
      };
      keys.push(word);
    } else {
      counts[word].tf = counts[word].tf + 1;
    }
  }

  var othercounts = [];
  for (var j = 1; j < allwords.length; j++) {
    var tempcounts = {};
    var tokens = allwords[j].split(/\W+/);
    for (var k = 0; k < tokens.length; k++) {
      var w = tokens[k].toLowerCase();
      if (tempcounts[w] === undefined) {
        tempcounts[w] = true;
      }
    }
    othercounts.push(tempcounts);
  }



  for (var i = 0; i < keys.length; i++) {
    var word = keys[i];
    for (var j = 0; j < othercounts.length; j++) {
      var tempcounts = othercounts[j];
      if (tempcounts[word]) {
        counts[word].df++;
      }
    }
  }

  for (var i = 0; i < keys.length; i++) {
    var word = keys[i];
    var wordobj = counts[word];
    wordobj.tfidf = wordobj.tf * log(files.length / wordobj.df);
  }


  keys.sort(compare);

  function compare(a, b) {
    var countA = counts[a].tfidf;
    var countB = counts[b].tfidf;
    return countB - countA;
  }

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    createDiv(key + " " + counts[key].tfidf);
  }


    var category = (keys[0]);
   document.getElementById('category').innerHTML= category;
   noCanvas();
}


// keywords for garbage { garbage, 
//   dust, dirt, heap, bags, dump, dirty, metals, 
//   scrapes, trash, junk, filth, disposal, rot, carcass, dead, 
//   dead animal, waste product, waste matter, waste material, waste,
//    substance, waste}


// keywords for drainage { leak, water, waterr leak, canal, flow, pipeline, burst, leakage, sewage, dhal, pool, trench} 

//  for (var i = 0; i < keys.length; i++) {
  //   // var keymax = 1;
  //   // if(keys[i] > keymax) {
  //   //    keymax = keys[i];
  //   //  }
  //   

  //  }
  //  console.log(keymax);


  
 
  // //  console.log( Math.max.apply(null , keys[i])) ; 

 




