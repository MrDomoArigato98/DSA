function sameFrequency(num1, num2) {
  // good luck. Add any arguments you deem necessary.

  const num1String = String(num1);
  const num2String = String(num2);
  if (num1String.length != num2String.length) {
    console.log("Not equal length - False");
    return false;
  }

  const frequency = {};
  for (let char of num1String) {
    
    frequency[char] = (frequency[char] || 0) + 1;
    
  }
  
  
  for (let i = 0; i < num2String.length; i++) {
    const char = num2String[i];

    
    if (frequency[char]) {
      frequency[char] -= 1;
    }else{
        console.log("Missing frequency - False");
        return false;
        
    }
  }
  console.log("True");

  return true;
}
sameFrequency(182, 281); // true
sameFrequency(34, 14); // false
sameFrequency(3589578, 5879385); // true
sameFrequency(22, 222); // false
