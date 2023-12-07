/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  str2 = str2.toLowerCase();
  str1 = str1.toLowerCase();
  let val = false;
  if(str1.length == str2.length) {
    for (let i=0;i<str1.length;i++) {
      val = str2.includes(str1[i]) ? true : false;
      if (!val) {
        return false;
      }
    } 
    return true;
  } else {
    return false;
  }
}

console.log('text is Anagram:', isAnagram('spar', 'sptr'));
// another way to do is, 
// 1 make all the text into lower character
// 2 sort all the letters from both the srring
// now a == b, it should be working
module.exports = isAnagram;
