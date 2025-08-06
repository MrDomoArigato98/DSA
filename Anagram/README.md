## Anagram
Given two strings, write a function to determine if the second string is an anagram of the first. 
An anagram is a word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman.

# Example

validAnagram('', '') // true
validAnagram( 'aaz', 'zza') // false 
validAnagram( 'anagram', 'nagaram') // true 
validAnagram( "rat", "car") // false 
validAnagram( 'awesome', 'awesom') // false 
validAnagram( 'qwerty', 'geywrt') // true 
validAnagram( 'texttwisttime', 'timetwisttext') // true