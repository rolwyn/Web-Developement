/**
 * A Node represents an HTML Element. A node can have a tag name,
 * a list of CSS classes and a list of children nodes.
 */
class Node {

	constructor(tag, id, classes, children) {
		// Tag name of the node.
		this.tag = tag;
		// Id of the node
		this.id = id;
		// Array of CSS class names (string) on this element.
		this.classes = classes;
		// Array of child nodes.
		this.children = children; // All children are of type Node
	}

/**
 * Returns descendent nodes matching the selector. Selector can be 
 * a tag name or a CSS class name.
 * 
 * For example: 
 * 
 * 1.
 * <div> 
 *   <span id="span-1"></span>
 *   <span id="span-2"></span>
 *   <div>
 *     <span id="span-3"></span>
 *   </div>
 * </div>
 * Selector `span` should return 3 span nodes in this order
 * span-1 -> span-2 -> span-3.
 *
 * 2.
 * <div> 
 *   <span id="span-1" class="note"></span>
 *   <span id="span-2"></span>
 *   <div>
 *     <span id="span-3"></span>
 *   </div>
 * </div>
 * Selector `.note` should return one span node with `note` class.
 *
 * 3.
 * <div> 
 *   <span id="span-1"></span>
 *   <span id="span-2"></span>
 *   <article>
 *     <div>
 *       <span id="span-3"></span>
 *     </div>
 *   </article>
 * </div>
 * Selector `div span` should return three span nodes in this order
 * span-1 -> span-2 -> span-3.
 * 
 * @param {string} the selector string.
 * @returns {Array} Array of descendent nodes.
 * @public
 */
	search(selector) {
		const givenSelector = selector;
		let resultSet = []; // the result array which is to be returned

		let selectorSubstr; // for two selector case, split the parameter in to an array of selectors

		// if selector is present then only add to variable
		if (givenSelector != undefined) {
			selectorSubstr = givenSelector.split(" ")
		} else {
			return "Selector cannot be empty"
		}

		/* Selector search function - takes a node as argument, traverses through it and 
		 *  returns result matching the selector
		 */
		let selectorSearch = (givenNode) => {

			const nodeQueue = [];
			// push to queue
			nodeQueue.push({
				node: givenNode,
				parentNode: null
			});

			while (nodeQueue.length) {
				// remove the first array element and add it to it's respective variable
				const { node, parentNode } = nodeQueue.shift();	
				if (selectorSubstr[1] != undefined && selectorSubstr[0] === node.tag) {	// check if substring is valid			
					for (const childElement of node.children) { 						// loop through child nodes																						// match tag with selector
						if (childElement.tag === selectorSubstr[1]) {
							resultSet.push(childElement.id)
						}
					}
				}
				else if (node.tag === selector && selector) {
					// check if tag matches the selector (single selector)
					if (parentNode != null)
						resultSet.push(node.id)
				}
				else if (selector.startsWith(".")) {
					// check if it's a class selector
					if (parentNode != null) {
						let selectorClass = selector.split(".")[1];
						for (let childClass of node.classes) {
							if (childClass == selectorClass) {
								resultSet.push(node.id)
							}
						}
					}
				}

				// add child nodes to the queue for searching all descendants
				if (node.children) {
					for (const childElement of node.children) {
						// Push child node to queue
						nodeQueue.push({
							node: childElement,
							parentNode: givenNode
						});
					}
				}
			}
		}

		// Check if input is proper using regex (alphanumeric)
		let checkForValidSelector = (selector) => {
			const regex = new RegExp('^[a-z0-9 .]+$')
			return regex.test(selector)
		}

		// check if input is correct and return results
		selectorSearch(this);
		if (this != undefined && resultSet.length != 0) {
			return resultSet
		}
		else if (!checkForValidSelector(givenSelector)) {
			return "Input a valid selector"	
		}
		else {
			return "Results not found"
		}
	}
}

// initialize from up to down because if not, it will give initialization error

let randomNode = new Node("span", "span-6", ["randomSpan"], []);
let spanNode5 = new Node("span", "span-5", ["note", "mania"], []);
let spanNode4 = new Node("span", "span-4", ["mania"], []);
let divNode4 = new Node("div", "div-4", [], [spanNode4, spanNode5]);
let labelNode1 = new Node("label", "lbl-1", [], []);
let sectionNode1 = new Node("section", "sec-1", [], [labelNode1]);
let divNode3 = new Node("div", "div-3", ["subContainer2"], [sectionNode1]);
let spanNode3 = new Node("span", "span-3", ["sub1-span3"], []);
let p1 = new Node("p", "para-1", ["sub1-p1", "note"], []);
let divNode2 = new Node("div", "div-2", ["subContainer1"], [p1, spanNode3]);
let spanNode2 = new Node("span", "span-2", [], []);
let spanNode1 = new Node("span", "span-1", ["note"], []);
let divNode1 = new Node("div", "div-1", ["mainContainer"], [spanNode1, spanNode2, divNode2, divNode3, divNode4]);
let body = new Node("body", "content", [], [divNode1, randomNode]);
// Span is the random node

// Testing
console.log("Started...");

console.log("Test Case 1");
console.log(divNode1.search("span"));

console.log("------------------------------------------------------");

console.log("Test Case 2");
console.log(divNode1.search(".note"));

console.log("------------------------------------------------------");

console.log("Test Case 3");
console.log(divNode1.search("label"));

console.log("------------------------------------------------------");

console.log("Test Case 4");
console.log(p1.search(".note"));

console.log("------------------------------------------------------");

console.log("Test Case 5");
console.log(divNode1.search("div"));

console.log("------------------------------------------------------");

console.log("Test Case 6");
console.log(randomNode.search("div"));

console.log("------------------------------------------------------");

console.log("Test Case 7");
console.log(divNode2.search("section"));

console.log("------------------------------------------------------");

console.log("Test Case 8");
console.log(body.search());
// Error conditions need to be handled
// invalid input need to be handled

console.log("------------------------------------------------------");

console.log("Test Case 9");
console.log(body.search("section"));

console.log("------------------------------------------------------");

console.log("Test Case 10");
console.log(body.search("div span"));