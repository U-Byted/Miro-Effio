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
    nextRowY = 0;
    rowPadding = 50;

    constructor(template, options) {
        this.template = template;
        this.participants = options.participants;
    }

    build() {
        const header = this.buildHeader(this.template[0]);

        console.log(this.nextRowY)
        let nextRowY = parseInt(this.nextRowY);
        const rows = this.buildRows();                               // Generate all elements in each row and put them into a row object
        rows.forEach(r => r.positionElementsX(this.columnPadding));  // Position all elements in each row, keeping track of positions
        rows.forEach(r => nextRowY = r.positionElementsY(nextRowY)); // Position all rows relative to one another
        const leftMostX = rows.map(r => r.left).sort()[0];           // Find the left most position of each row
        rows.forEach(r => r.positionDescriptionElement(leftMostX));  // Position all desciption elements to the left of all rows 

        const allItems = [header];
        rows.forEach(r => allItems.push(r.allElements()))
        return allItems;
    }

    buildHeader(header) {
        const titleBar = header.elements[0];
        titleBar.y += this.nextRowY;
        this.nextRowY += titleBar.height + this.rowPadding;
        return titleBar;
    }

    buildRows() {
        const rows = [];
        this.template.forEach(r => {
            if(r.type == stepType.ROW) rows.push(new Row(r, this.participants))
        });
        return rows
    }
}