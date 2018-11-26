export class App {

    private context: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private input: HTMLTextAreaElement;
    private index: number = 0;

    constructor() {

        this.onWindowResize = this.onWindowResize.bind(this);

        this.init();
    }

    private init(): void {

        window.addEventListener("resize", () => this.onWindowResize());

        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");

        this.input = document.getElementById("data-input") as HTMLTextAreaElement;

        document.getElementById("add-btn").addEventListener("click", () => {
            var text = this.input.value;
            this.parse(text);
        });

        this.onWindowResize();
    }

    private parse(s: string): void {

        var data = JSON.parse(s);

        this.traverse(data);
    }

    private traverse(data: any) {

        if (Array.isArray(data) && data[0] && typeof data[0].x === "number") {
            this.drawRec(data);

        } else if (typeof data.x1 === "number") {
            this.drawLine(data);

        } else {
            Object.entries(data).forEach(e => {
                var value = e[1];
                if (value) {
                    this.traverse(value);
                }
            });
        }
    }

    private drawLine(line: { x1: number, y1: number, x2: number, y2: number }): void {

        var points = [
            { x: line.x1, y: line.y1 },
            { x: line.x2, y: line.y2 }
        ];

        this.drawRec(points);
    }

    private drawRec(data: { x: number, y: number }[]): void {

        var offset = 100;
        var scale = 0.1;

        for (let i = 0; i < data.length; i++) {
            const p = data[i];

            var x = p.x * scale + offset;
            var y = p.y * scale + offset;

            if (i === 0) {
                this.context.beginPath();
                this.context.moveTo(x, y);
            }
            else {
                this.context.lineTo(x, y);
            }
        }

        this.context.closePath();
        this.context.strokeStyle = this.getColor();
        this.context.stroke();
    }

    private getColor(): string {

        var colors = ["red", "green", "blue", "orange", "black", "purple"];

        if (!colors[this.index]) {
            this.index = 0;
        }

        return colors[this.index++];
    }

    private onWindowResize() {

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}

var app = new App();
