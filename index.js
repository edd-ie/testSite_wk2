let form = document.getElementById('nuts');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let input = document.getElementById('formInput').value;
    console.log(input);
    


    searchEngine(input)


})




let searchEngine = (value)=>{
    fetch('http://localhost:3000/characters')
    .then((resource)=>resource.json())
    .then((data)=>{
        let storage;
        storage = data
        console.log(storage)

        let pet;
        for (let i of storage){
            if (i.id == value){
                pet = i
            }
        }
        console.log(pet);

        let display = document.getElementById('newStuff')
        while (display.hasChildNodes()) {
            display.removeChild(display.firstChild);
        }

        let name = document.createElement('h3')
        let image = document.createElement('img')
        let votes = document.createElement('p')
        let voteBtn = document.createElement('button')

        
        name.textContent = `Name: ${pet.name}`
        image.src = pet.image
        votes.textContent = `Votes: ${pet.votes}`
        voteBtn.textContent = 'like'

        display.appendChild(name)
        display.appendChild(votes)
        display.appendChild(image)
        display.appendChild(voteBtn)
        

        voteBtn.addEventListener('click', () =>{
            let count = pet.votes+1
            fetch('http://localhost:3000/characters')
            .then(response => response.json())
            .then(data => {
            // Find the character with id 7 and increment its votes by 1
            let character;
            for (let i of data){
                if (i.id == value){
                    character = i
                }
            }

            console.log(character)
            character.votes += 1;
            console.log(character)

            // Make a PUT request to update the data on the server
            fetch(`http://localhost:3000/characters/${value}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(character)
            })
                .then(response => response.json())
                .then(data => {
                // Log the updated data for debugging purposes
                console.log(data);
                searchEngine(value)
                })
                .catch(error => {
                // Handle errors
                console.error(error);
                
                });
            })
            .catch(error => {
            // Handle errors
            console.error(error);
            
            });

            
        })
        


    })

}





