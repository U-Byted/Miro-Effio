function checkGenerationButton() {
    const meetingType = document.getElementById('meetingType').value;
    const participantAmount = parseInt(document.getElementById('participantAmount').value);
    const hasValues = [
        meetingType != "",
        meetingType.length > 0,
        participantAmount > 0
    ];
    
    document.getElementById('generationButton').disabled = !hasValues.every((val) => val == true);
}

function generate()  {
    const options = {
        meetingType: document.getElementById('meetingType').value,
        participants: parseInt(document.getElementById('participantAmount').value),
        example: document.getElementById('meetingType').value
    }
    const factory = new Factory(brainstorm, options);
    const items = factory.build().flat(Infinity);
    miro.board.widgets.create(items).catch(e => console.log("Whoops:", e));
}

