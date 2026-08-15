About
Web app game where you have to find a secret word by typing other words if the letters match they go green and if they don't but some of the letters of your attempt is in the solution but not in the correct position they go yellow.

Architecture
Vanilla Javascript, HTML and CSS
One render function that updates the UI based on the state of the game.
No direct DOM modification outside the render functon.
This makes the code more robust and scalable, separating the model from the view.
