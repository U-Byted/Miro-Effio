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

async function makeSomething()  {
    await miro.board.widgets.create({type: 'sticker', text: 'Hello'});
}