let alerts = ["Hey, you are awesome", "You are so wonderful", "What a marvel you are", "You're so lovely", "You're so sweet that I'd think you're a sweet potato -- and I LOOOOVE POTATOES"]

const showAlert = (name) => {return alert(alerts[(Math.floor(Math.random()*alerts.length))] + `, ${name}!`)}

showAlert("you ball of fluff");