// myNodeList contains all li elements, which are the tasks the user has added
var myNodelist = document.getElementsByTagName("LI");
var i;
// Add delete buttons to each task currently on the page
for (i = 0; i < myNodelist.length; i++) {
  // Create span to hold the x symbol
  var span = document.createElement("SPAN");
  // Create text node that contains x symbol
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  // Add text node to span with close class name
  span.appendChild(txt);
  // Add close button span as a child to each list item
  myNodelist[i].appendChild(span);
}

// Hide task upon clicking the x button for that task
// close variable represents all the x button elements
var close = document.getElementsByClassName("close");
var i;
// Add an onclick function to each x button that hides
// its corresponding task when clicked
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    // div is the element containing the task
    var div = this.parentElement;
    // Hide the task div on click
    div.style.display = "none";
  }
}

// Check off the task when the task is clicked on
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  // If a specific item is clicked on
  if (ev.target.tagName === 'LI') {
    // Toggle checked (changes css properties)
    ev.target.classList.toggle('checked');
  }
}, false);

// newElement() creates a new task using the input text
// when the Add button is clicked
function newElement() {
  var li = document.createElement("li");
  // Get task name from the text box
  var inputValue = document.getElementById("myInput").value;
  // Create text node with the task title and add it to the list item element
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  // Throw error if the user tries to add an empty task
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    // Add task to the list
    li.setAttribute('draggable', true)
    li.ondrag = handleDrag;
    li.ondragend = handleDrop;
    document.getElementById("myList").appendChild(li);
  }
  // Reset text box to blank after adding task
  document.getElementById("myInput").value = "";

  // Create and add x button for the task we just added
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // Add onclick function to the x button for the task we just added
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      // div is the element containing the task
      var div = this.parentElement;
      // Hide the task div on click
      div.style.display = "none";
    }
  }
}

// Enable draggable items for all lists with the listClass class
function enableDragSort(listClass) {
  var sortableLists = document.getElementsByClassName(listClass);
  // Calls enableDragList for all lists with the listClass class
  for (i = 0; i < sortableLists.length; i++) {
    enableDragList(sortableLists[i]);
  }
}

// Calls enableDragItem on every item (task) in the to do list
function enableDragList(list) {
  for (i = 0; i < list.children.length; i++) {
    enableDragItem(list.children[i]);
  }
}

// Sets each list item to draggable
function enableDragItem(item) {
  item.setAttribute('draggable', true)
  // Call handleDrag function when the item is dragged
  item.ondrag = handleDrag;
  // Call handleDrop function when the item is dropped
  item.ondragend = handleDrop;
}

// handleDrag is called when a task is dragged
function handleDrag(item) {
  // Store item and list that was dragged
  var selectedItem = item.target;
  var list = selectedItem.parentNode;
  // Store position at which event occurred
  var x = event.clientX;
  var y = event.clientY;

  // Add new class to the item called drag-sort-active
  selectedItem.classList.add('drag-sort-active');
  var swapItem;
  if (document.elementFromPoint(x, y) === null) {
    // If there is no element where the event occurred
    // then we are just swapping with the initially selected item
    swapItem = selectedItem;
  } else {
    // Otherwise we are swapping the dragged item with the element at point x, y
    swapItem = document.elementFromPoint(x, y);
  }
  // If both items are in the same list
  if (list === swapItem.parentNode) {
    // If swapItem is right next to selectedItem
    if (swapItem === selectedItem.nextSibling) {
      // Move swapItem to the next item to enable the insert
      swapItem = swapItem.nextSibling;
    }
    // Insert the dragged item before the item we are swapping with
    list.insertBefore(selectedItem, swapItem);
  }
}

// handleDrop is called when the drag ends (task is dropped)
function handleDrop(item) {
  // Remove the drag-sort-active class from the task item
  item.target.classList.remove('drag-sort-active');
}

// Enable dragging on all lists with the class drag-sort-enable
enableDragSort('drag-sort-enable');
