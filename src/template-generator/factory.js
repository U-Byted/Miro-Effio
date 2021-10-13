class Row {
    name;
    descriptionText;
    description;
    elements;
    link;
    participants;

    // Row position data
    left = Infinity;
    down = -Infinity;
    columnPadding = 50;
    rowPadding = 50;
    
    allElements() {
        let all = [];
        if(this.description) all.push(this.description);
        if(this.elements && this.elements.length) all.push(this.elements);
        all = all.flat(Infinity);
        return all;
    }

    constructor(data, participants = 1) {
        this.name = data.name;
        this.link = data.link;
        this.participants = participants;
        this.elements = this.build(data.elements);
        
        this.description = this.buildDesciption(data.description);
    }

    build(elementData) {
        if(!elementData || !elementData.length) return [];
        
        const elements = [];
        
        elementData.forEach(ed => {
            const amount = ed.repeating ? this.participants: 1; 
            for(let i = 0; i < amount; i++) { 
                elements.push({...ed}); 
            }
        })

        return elements;
    }

    buildDesciption(descriptionText) {
        let descriptionElement = undefined;
        if(descriptionText) {
            const description = {
                type: "shape",
                text: descriptionText,
                width: 300,
                x: 0,
                y: 0,
                style: {
                    backgroundColor: "#ADDBD2",
                    backgroundOpacity: 0.3,
                    shapeType: miro.enums.shapeType.ROUNDER
                },
            };
            descriptionElement = description;
        }
        return descriptionElement;
    }

    positionElementsX(){
        if(!this.elements || !this.elements.length) return;

        // Position elements besides eachother
        let nextRight = 0;
        this.elements.forEach(e => {
            e.x = nextRight;
            nextRight += e.width + this.columnPadding; 
        });

        // Position the elements to the middle of the page
        this.elements = this.elements.flat(Infinity);
        const elementsWidth = this.elements[this.elements.length - 1].x - this.elements[0].x;
        const elementsOffset = elementsWidth / 2;
        this.elements.forEach(e => e.x -= elementsOffset);

        // Find left most x pos
        this.elements.forEach(e => this.left = e.x < this.left ? e.x : this.left);
    };

    positionElementsY(nextY){
        if(this.description) this.description.y = nextY;
        if(this.elements && this.elements.length != 0) this.elements.forEach(e => e.y = nextY);

        let maxHeight = 100; // We assume that 100 is the default element height
        this.allElements().forEach(e => maxHeight = e.height > maxHeight ? e.height : maxHeight);

        return nextY + maxHeight + this.rowPadding; 
    };

    positionDescriptionElement(newX){
        if(this.description) {
            this.description.x = newX - this.description.width;
        }
    };
}

class Factory {
    rowPosY = 0;
    rowPadding = 50;
    columnPadding = 50;

    constructor(template, options) {
        this.template = template;
        this.participants = options.participants;
    }

    build() {
        const miroItems = [];
        this.template.forEach(item => {
            switch(item.type) {
                case stepType.HEADER:
                    miroItems.push(this.buildHeader(item));
                    break;
                case stepType.ROW:
                    miroItems.push(this.buildRow(item));
                    break;
            }
        });
        return miroItems;
    }

    buildHeader(header) {
        const titleBar =  header.elements[0];
        titleBar.y += this.rowPosY;
        const items = [titleBar];
        this.rowPosY += titleBar.height + this.rowPadding;
        return items;
    }

    buildRow(row) {
        // Evry iteration the following must happen: 
        // Generate the whole row as if its the first row
        // Find the higest point in the row, and shift it down so that it is lower than the this.rowPosY
        // Find the lowest point of the row, and use this to calculate the this.rowPosY
        // Find the left most point in the row, and use this to know where to place the explenations later on.

        // Create elements that the users interact with
        const items = [];

        // Create all elements
        let elements = [];
        if(row.elements){
            row.elements.forEach(element => {
                elements.push(this.buildRowElement(element));
            });
        }

        // Position the elements to the middle of the page
        elements = elements.flat(Infinity);
        const first = elements[0];
        const elementsWidth = elements[elements.length - 1].x - first.x;
        const elementsOffset = elementsWidth / 2;
        elements.forEach(e => e.x -= elementsOffset);

        // Create the step decription
        if(row.description) {
            const explanation = {
                type: "shape",
                text: row.description,
                width: 300,
                x: 0,
                y: first.y,
                style: {
                    backgroundColor: "#ADDBD2",
                    backgroundOpacity: 0.3,
                    shapeType: miro.enums.shapeType.ROUNDER
                },
            };
            explanation.x = first.x - explanation.width;
            items.push(explanation);
        }
        items.push(elements);
        this.rowPosY += 200 + this.rowPadding;
        return items;
    }

    buildRowElement(element) {
        if(element.type == "") return [];
        element.y += this.rowPosY;
        const items = [{...element}];
        if(element.repeating) {
            for(let i = 0; i < this.participants - 1; i++) {
                element.x += element.width + this.columnPadding;
                items.push({...element});
            }
        }
        return items;
    }
}