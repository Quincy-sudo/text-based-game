// getting the text element
const textElement = document.getElementById('text');
// getting the option button element
const optionButtonsElement = document.getElementById('option-buttons');

//empty object that allows us to keep track of what the character has on them
let state = {};
// function to start the game
function startGame() {
  // making sure state is an empty object
  state = {};
  // also making sure that the next textnode is showing and making sure it's the first one
  showTextNode(1);
}
// a function to display whichever option the user is on
// this is going to take a particular index of a text node

function showTextNode(textNodeIndex) {
  // get text node which is going to be equal to text notes
  // and this is going to take in a text node for each one in the array
  // this will also allow us to find the one that has the current ID thats why we use textNode.id
  // and make it to say Textnode.id is going to be equal to text node index
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  // to show the text we set the inner text of the text element equal to that textnode
  textElement.innerText = textNode.text;

  // to remove all the options, use a while loop to say the optionbuttonelement.firstchild
  // while it has a first child we want to remove that child
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }
  // a loop through all of the options
  textNode.options.forEach((option) => {
    // checking to see if we can actuall show that node
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      // click event listener which takes a single function
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}
// a function that happens every time the user selects an option
// this will take what ever option that the user selects
//since we need to know what option the user is selecting

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}
// the text nodes being defined in a variable
const textNodes = [
  {
    //an object which is going to have an ID and 1 will be our very first textnode
    id: 1,
    text: 'You wake up a room in the top floor. you see a touch, do you take the flashlight?',

    //different options for the user
    options: [
      {
        text: 'Take the flashlight',
        //if the user takes the flashlight,
        //we need to set the state for the flashlight to be true since the character now has a flashlight
        setState: {
          flashlight: true,
        },
        //an option that will also tell us what the next textNode is
        nextText: 2,
      },
      {
        //since the player doesn't take the flashlight, we don't need to setState
        text: 'Leave the flashlight',
        nextText: 2,
      },
    ],
  },

  {
    id: 2,
    text: 'You venture forth in search of answers to where you are when you come across a shadow."do you have a flashlight dear"',
    options: [
      {
        text: 'give the shadow the flashlight and gain a dagger',
        requiredState: (currentState) => currentState.flashlight,
        setState: {
          flashlight: false,
          dagger: true,
        },
        nextText: 3,
      },
      {
        text: 'give the shadow the flashlight and gain a shield',
        requiredState: (currentState) => currentState.flashlight,
        setState: {
          flashlight: false,
          shield: true,
        },
        nextText: 3,
      },
      {
        text: 'Ignore the shadow',
        nextText: 3,
      },
    ],
  },

  {
    id: 3,
    text: 'After leaving the shadow you start to feel tired and stumble upon a comfy bed and a open door',
    options: [
      {
        text: 'go through the door',
        nextText: 4,
      },
      {
        text: 'sleep on the bed',
        nextText: 5,
      },
    ],
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the house and are killed by some terrible monster in your sleep.',
    options: [
      {
        text: 'Restart',
        nextText: -1,
      },
    ],
  },

  {
    id: 5,
    text: 'You wake up well rested and full of energy ready to explore the house',
    options: [
      {
        text: 'Explore the house',
        nextText: 7,
      },
    ],
  },
  {
    id: 7,
    text: 'While exploring the house you come across a horrible monster in your path.',
    options: [
      {
        text: 'Try to run',
        nextText: 8,
      },
      {
        text: 'Attack it with your dagger',
        requiredState: (currentState) => currentState.dagger,
        nextText: 9,
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10,
      },
      {
        text: 'use the flashlight on the monster',
        requiredState: (currentState) => currentState.flashlight,
        nextText: 11,
      },
    ],
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the monster easily catches.',
    options: [
      {
        text: 'Restart',
        nextText: -1,
      },
    ],
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single dagger.',
    options: [
      {
        text: 'Restart',
        nextText: -1,
      },
    ],
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1,
      },
    ],
  },
  {
    id: 11,
    text: 'You shine the flashlight at the monster and it runs away',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1,
      },
    ],
  },
];
// calling startGame as soon as the user loads the game
startGame();
