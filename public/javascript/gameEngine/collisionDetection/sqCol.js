function sqrColCheck(rect1, rect2) {
    if (
        rect1.x + rect1.width >= rect2.x &&
        rect1.x <= rect2.x + rect2.width &&
        rect1.y + rect1.height >= rect2.y &&
        rect1.y <= rect2.y + rect2.height
    ) {
        if (rect1.collisionEnabled) {
            
            if(rect1.y + rect1.height <= rect2.y + 20 && rect1.y + rect1.height >= rect2.y - 5) {
                rect1.y = rect2.y - rect1.height;
                rect1.bottomColliding = true;
            } 
            if(rect1.x + rect1.width <= rect2.x + 20 && rect1.x + rect1.width >= rect2.x - 20) {
                rect1.rightColliding = true;
            } 
            
            if(rect1.x <= rect2.x + rect2.width + 20 && rect1.x >= rect2.x + rect2.width - 20) {
                rect1.leftColliding = true
            }

        }
       
    } else {
        if(!rect1.colChecked) {
            rect1.bottomColliding = false;
            rect1.leftColliding = false;
            rect1.rightColliding = false;
            rect1.topColliding = false;
        }
    }

    rect1.colChecked = true;
}
//rectangles[0].y + rectangles[0].height >= rectangles[1].y + 5 && rectangles[0].y + rectangles[0].height <= rectangles[1].y - 5