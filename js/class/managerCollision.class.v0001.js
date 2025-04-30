// ManagerCollision Global collisions manager between objects draggable
//
// This class is responsible for managing the collisions between draggable objects.
class ManagerCollision {
    constructor() {
        this.draggables = [];

        // document.addEventListener("mousemove", () => {
        //     this.#checkAllCollisions();
        // });

        document.addEventListener("mouseup", () => {
            this.#checkAllCollisions();
        });
    }

    // add adds a draggable object to the collision manager.
    //
    // The draggable object must implement the getRect, collisionTotalEvent and collisionPartialEvent methods.
    add(draggable) {
        if (typeof draggable.getRect !== 'function') {
            throw new Error('Draggable must implement getRect method');
        }

        if (typeof draggable.collisionTotalEvent !== 'function') {
            throw new Error('Draggable must implement collisionTotalEvent method');
        }

        if (typeof draggable.collisionPartialEvent !== 'function') {
            throw new Error('Draggable must implement collisionPartialEvent method');
        }

        this.draggables.push(draggable);
    }

    #checkAllCollisions() {
        let collidingTotalList = [];
        let collidingPartialList = [];
        for (let i = 0; i < this.draggables.length; i++) {
            const objA = this.draggables[i];
            const rectA = objA.getRect();

            for (let j = 0; j < this.draggables.length; j++) {
                if (i === j) {
                    continue;
                }

                const objB = this.draggables[j];
                const rectB = objB.getRect();

                const isFullyInside = this.#isFullyInside(rectA, rectB) || this.#isFullyInside(rectB, rectA);
                const isNotFullyInside = this.#isColliding(rectA, rectB) || this.#isColliding(rectB, rectA);
                const isColliding = isFullyInside || isNotFullyInside;

                if (isColliding && isFullyInside) {
                    collidingTotalList[objA.uID] = {total: isFullyInside, b: objB};
                }

                if (isColliding && !isFullyInside) {
                    collidingPartialList[objA.uID] = {total: isFullyInside, b: objB};
                }
            }
        }

        for (let i = 0; i < this.draggables.length; i++) {
            const objA = this.draggables[i];
            if (collidingTotalList[objA.uID]) {
                objA.collisionTotalEvent(true, collidingTotalList[objA.uID].b);
            }
            else {
                objA.collisionTotalEvent(false, false, undefined);
            }

            if (collidingPartialList[objA.uID]) {
                objA.collisionPartialEvent(true, collidingPartialList[objA.uID].b);
            }
            else {
                objA.collisionPartialEvent(false, false, undefined);
            }
        }
    }

    #isColliding(rectA, rectB) {
        return !(
            rectA.right < rectB.left ||
            rectA.left > rectB.right ||
            rectA.bottom < rectB.top ||
            rectA.top > rectB.bottom
        );
    }

    #isFullyInside(rectA, rectB) {
        return (
            rectA.top <= rectB.top &&
            rectA.left <= rectB.left &&
            rectA.bottom >= rectB.bottom &&
            rectA.right >= rectB.right
        );
    }
}
