function load_button(button) {
    document.getElementById(button).disabled = false
}

function load(next_step) {
    next_step.style.display = 'block';
}

function check_number(next_button) {
    var participant_amount_e = document.getElementById("participant_amount");
    console.log(participant_amount_e.value);
    if(parseInt(participant_amount_e.value) > 0) {
        load_button(next_button)
    }
}

function generate_template() {
    var meeting_type_e = document.getElementById("type");
    var participant_amount_e = document.getElementById("participant_amount");
    var explanation_e = document.getElementsByName("choice");

    var meeting_type = meeting_type_e.options[meeting_type_e.selectedIndex].text;
    var participant_amount = participant_amount_e.value;
    var explanation = false;
    for (var i = 0, length = explanation_e.length; i < length; i++) {
        if (explanation_e[i].checked) {
            // do whatever you want with the checked radio
            explanation = explanation_e[i].value;

            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    // Set values in html
    document.getElementById("parameter_type").textContent = meeting_type;
    document.getElementById("parameter_amount").textContent = participant_amount;
    document.getElementById("parameter_example").textContent = explanation;
    
    // Show partamaters container
    document.getElementById("div_parameters").style.display = 'block';
    makeSomething();
}

async function makeSomething()  {
    await miro.board.widgets.create({type: 'sticker', text: 'Hello'});
}