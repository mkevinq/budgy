/*
Author: Evan Kilburn
Date: Jan 16, 2021
Description: Call main to get JSON object of reciept
*/
var keyWords = ["BANANA","MILK","BREAD","CHIK","CARROT","PEPPER","APPLES","GRAPE","HUMMUS","JCE","MOVIE", "TV", "SPORTS","RENT", "UTILITIES"];
var groceries = ["BANANA","MILK","BREAD","CHIK","CARROT","PEPPER","APPLES","GRAPE","HUMMUS","JCE"];
var entertainment = ["MOVIE", "TV", "SPORTS"];
var miscellaneous = ["RENT", "UTILITIES"];
function getItems(listOfStrings){
	var items = []
	var itemCategory = []
	var prices = []
	searchRegex  = new RegExp(keyWords.join('|'), 'g');
	var i=0;
	for (i = 0; i < listOfStrings.length; i++) {
		var foundKeyWords = listOfStrings[i].match(searchRegex);//finds occurences of key words
		if (foundKeyWords != null){
			items.push(foundKeyWords[0]);
			itemCategory.push(catagorize(foundKeyWords[0]));
		}
		if (foundKeyWords != null && foundKeyWords.length!=0){//a key word is on this line
			var price = ""
			for (j=(listOfStrings[i].length-1); j >=0; j--){
				if ("1 2 3 4 5 6 7 8 9 0 .".includes(listOfStrings[i][j])){//if it is a number
					price = listOfStrings[i][j]+price;
				}
				else if (listOfStrings[i][j]!=" " && "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"){//if it is not a space and reaches a character, kill the line read
					break;
				}
  			}
  			prices.push(price)
		}
	}
	return ([items,prices,itemCategory]);
}

function catagorize(word){
	if (groceries.includes(word)){
		return "groceries";
	}
	else if (entertainment.includes(word)){
		return "entertainment";
	}
	return "miscellaneous";
}

function makeJSON(items, prices, itemCategory){
	var jsonList = []
	var i=0;
	for (i = 0; i < items.length; i++) {
		var jsonItem = {'name':items[i],'price':prices[i],'category':itemCategory[i]};
		jsonList.push(jsonItem);
	}
	return jsonList;
}

function main(listOfStrings){
	var ret = getItems(testString);
	var items = ret[0];
	var prices = ret[1];
	var itemCategory = ret[2];
	var jsonFile = makeJSON(items, prices, itemCategory);
	//console.log(jsonFile);
	return jsonFile;
}


testString = ["PREMIUM BANANA $4.20","APPLES $2.50","BLANK $3.50"];
console.log(main(testString));
var d = new Date();
console.log(d);
/*var ret = getItems(testString);
var items = ret[0];
var prices = ret[1];
var itemCategory = ret[2];
console.log(items);
console.log(prices);
console.log(itemCategory);
var jsonFile = makeJSON(items, prices, itemCategory);
console.log(jsonFile);*/
