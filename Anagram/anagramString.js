/*
Given two strings, write a function to determine if the second string is an anagram of the first. 
An anagram is a word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman.

validAnagram('', '') // true
validAnagram( 'aaz', 'zza') // false 
validAnagram( 'anagram', 'nagaram') // true 
validAnagram( "rat", "car") // false 
validAnagram( 'awesome', 'awesom') // false 
validAnagram( 'qwerty', 'geywrt') // true 
validAnagram( 'texttwisttime', 'timetwisttext') // true

*/

function validAnagram(firstWord = "", secondWord = "") {
  if (firstWord.length != secondWord.length) {
    console.log(`${firstWord} and ${secondWord} - False.`);
    return false;
  }

  const firstWordCharCount = {};

  for (let char of firstWord) {
    firstWordCharCount[char] = (firstWordCharCount[char] || 0) + 1;
  }

  for (let i = 0; i < firstWord.length; i++) {
    let char = secondWord[i];

    if (!firstWordCharCount[char]) {
      console.log(firstWordCharCount[char]);
      return false;
    } else {
      firstWordCharCount[char] = firstWordCharCount[char] - 1;
    }
  }
  console.log(`${firstWord} and ${secondWord} - True.`);
  return true;
}

validAnagram("tar", "rat"); // true
validAnagram("aaz", "zza"); // false
validAnagram("anagram", "nagaram"); // true
validAnagram("awesome", "awesom"); // false
validAnagram("qwerty", "qeywrt"); // true
validAnagram("texttwisttime", "timetwisttext"); // true
validAnagram("testing","testnii")
