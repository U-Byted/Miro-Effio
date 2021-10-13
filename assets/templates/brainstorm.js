const brainstorm = [
    {
        name: "title",
        type: stepType.HEADER,
        elements: [
            {
                type: "shape",
                text: "Start brainstorm process 2-4 people",
                width: 3900,
                height: 350,
                x: 0,
                y: 0,
                style: {
                    fontSize: 141,
                    backgroundColor: "#FEF445",
                    backgroundOpacity: 0.3,
                    shapeType: miro.enums.shapeType.ROUNDER,
                }
            }
        ]
    },
    {
        name: "check-in-description",
        type: stepType.ROW,
        elements: [
            {
                type: elementType.TEXT,
                text: "Here you can pose the question you want to start you meeting with. For example: How did you wake up this morning? What did you laugh about today?",
                width: 270,
                height: 180,
                scale: 3,
                y: 0,
                x: 0,
                style: {
                    textAlign: miro.enums.textAlign.CENTER,
                }
            },
        ]
    },
    {
        name: "check-in",
        description: "Check-in.",
        type: stepType.ROW,
        link: "personal-brainstorm",
        elements: [
            {
                type: elementType.SHAPE,
                y: 0,
                x: 0,
                width: 200,
                height: 200,
                style: {
                    backgroundColor: "#CEE741",
                    backgroundOpacity: 0.5
                },
                repeating: true
            }
        ]
    },
    {
        name: "reflection",
        description: "Reflection on previous meeting.",
        type: stepType.ROW, 
        link: "personal-brainstorm",
    },
    {
        name: "personal-brainstorm",
        description: "10 minute personal brainstorm.\nShort presentation from every participant.\nTime to ask questions or discuss ideas presented.",
        type: stepType.ROW, 
    },
    {
        name: "new-ideas",
        description: "Noting any new ideas or additions. Cluster if needed.",
        type: stepType.ROW, 
    },
    {
        name: "break",
        description: "Space for a break.",
        type: stepType.ROW, 
    },
    {
        name: "work-out",
        description: "Everyone picks one idea to work out. Then adds something to every chosen idea.",
        type: stepType.ROW, 
    },
    {
        name: "discuss-ideas",
        description: "Going over each idea, review them and discuss them.\nNote final ideas in last boxes.",
        type: stepType.ROW, 
    },
    {
        name: "minutes",
        description: "This last part can be used as minutes or another form of reference to rework it to a textual plan if needed.\nTIP: if all the steps are put on post-its, they can be exported to Excel.",
        type: stepType.ROW, 
    },
]