miro.onReady(() => {
    const icon24 = '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"/>';
    miro.initialize({
        extensionPoints: {
            toolbar: {
                title: 'Effio',
                toolbarSvgIcon: icon24,
                librarySvgIcon: icon24,
                onClick: () => {
                    loadTemplateGenerator();
                }
            }
        }
    });

    console.log(miro)
})

async function onToolbarAppButtonClicked() {
    const isAuthorized = await miro.isAuthorized()

    if (!isAuthorized) {
        // Ask the user to authorize the app.
        await miro.requestAuthorization()
    }

    // Once authorized, open the app.
    openEffio()
}

function openEffio() {
    miro.board.ui.openLeftSidebar('main-app-sidebar.html')
}

function loadTemplateGenerator() {
    const websiteUrl = "./src/pages/index.html";
    miro.board.ui.openModal(websiteUrl);
}