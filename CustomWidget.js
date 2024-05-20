(function () {

  let template = document.createElement('template');
  template.innerHTML = `
    <style>
      /* Add any custom styles here */
      #root {
        width: 100%;
        height: 100%;
      }
    </style>
    <div id="root"></div>
  `;

  class BarPlot extends HTMLElement {
    constructor() {
      super();

      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this.data = [10, 20, 30, 40, 100];
      // Initialize the canvas variable
      this.canvas = document.createElement("canvas");
      this._shadowRoot.getElementById("root").appendChild(this.canvas);

      // Create number formatter
      this.formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      });

      this.render();
    }

    connectedCallback() {
      this.render();
    }

    onCustomWidgetAfterUpdate(oChangedProperties) {
      this.render();
    }

    onCustomWidgetResize(width, height) {
      this.render();
    }

    async render() {
      // Get the canvas context
      const dataBinding = this.myDataBinding;
      const ctx = this.canvas.getContext("2d");

      if (!dataBinding || dataBinding.state !== 'success') {
        const img = new Image();
        img.src = './reply.png';
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
      } else {
        this.data = [];
        var rawMeasures = dataBinding.data[0]; // Select the first item in the 'data' array
        this.data = Object.keys(rawMeasures).map(key => rawMeasures[key].raw);
      }

      // Clear the canvas
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Set up canvas size
      this.canvas.width = this._shadowRoot.getElementById("root").clientWidth;
      this.canvas.height = this._shadowRoot.getElementById("root").clientHeight;

      const margin = { top: 20, right: 10, bottom: 30, left: 10 };
      const width = this.canvas.width - margin.left - margin.right;
      const height = this.canvas.height - margin.top - margin.bottom;

      const barWidth = width / this.data.length;
      const columnLabels = ['INITIAL', 'AWARDED', 'FORECAST', 'ROLLING', 'GAP'];
      

      let rend;
      let maxx;
      if (Math.min(...this.data)<0){
       rend= Math.max(...this.data)- Math.min(...this.data);
       maxx= Math.max(...this.data)
      }
      else {
         rend= Math.max(...this.data);
         maxx= Math.max(...this.data)
      }



      // Draw bars using a for loop
      for (let i = 0; i < this.data.length; i++) {
        let d = this.data[i];
        let barColor;
        if (i === 0) barColor = "rgb(33, 168, 40)"; // First number in green
        else if (i === this.data.length - 1) barColor = "rgb(214, 47, 47)"; // Last number in red
        else if (i === 3) barColor = "rgb(64, 64, 64)";
        else barColor = "rgb(191, 191, 191"; // Other numbers in grey

        if (i === 0 || i === 1) {
          ctx.fillStyle = barColor;
          ctx.fillRect(
            margin.left + i * barWidth + 10, // Add some separation between bars
            margin.top + ((maxx/rend*height)-(d/rend*height)),
            barWidth - 20, // Reduce the width to include separation
            d / rend * height
          );
        } else if (i === 2) {
          d = this.data[i] + this.data[i - 1];
          ctx.fillStyle = barColor;
          ctx.fillRect(
            margin.left + i * barWidth + 10, // Add some separation between bars
            margin.top + ((maxx/rend*height)-(d/rend*height)),
            barWidth - 20, // Reduce the width to include separation
            d / rend * height
          );

          ctx.fillStyle = "rgba(255, 255, 255, 1)";
          ctx.fillRect(
            margin.left + i * barWidth + 10, // Add some separation between bars
            margin.top + ((maxx/rend*height)-(this.data[i - 1]/rend*height)),
            barWidth - 20, // Reduce the width to include separation
            this.data[i - 1] / rend * height
          );
        } 
        else if (i === 3) {
          ctx.fillStyle = barColor;
          ctx.fillRect(
            margin.left + i * barWidth + 10, // Add some separation between bars
            margin.top + ((maxx/rend*height)-(d/rend*height)),
            barWidth - 20, // Reduce the width to include separation
            d / rend * height
          );
        } 
        else {
          ctx.fillStyle = barColor;
          ctx.fillRect(
            margin.left + i * barWidth + 10, // Add some separation between bars
            margin.top + ((maxx/rend*height)-(d/rend*height)),
            barWidth - 20, // Reduce the width to include separation
            d / rend * height
          );
        }

        // Format the number
        const formattedValue = this.formatter.format(d);

        // Draw the number above the bar
        if (i === 2) {
          d = this.data[2] ;
          const formattedInnerValue = this.formatter.format(d);
          ctx.fillStyle = "black";
          ctx.font = "13px Arial";
          ctx.textAlign = "center";
          ctx.fillText(
            formattedInnerValue, // Use formatted value
            margin.left + i * barWidth + barWidth / 2, // Center text horizontally
            margin.top + ((maxx/rend*height)-(this.data[3]/rend*height)) - 5 // Place text above the bar
          );
        } else {
          ctx.fillStyle = "black";
          ctx.font = "13px Arial";
          ctx.textAlign = "center";
          ctx.fillText(
            formattedValue, // Use formatted value
            margin.left + i * barWidth + barWidth / 2, // Center text horizontally
            margin.top + ((maxx/rend*height)-(d/rend*height)) - 5 // Place text above the bar
          );
        }

        // Draw the column labels
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          columnLabels[i], // Column label
          margin.left + i * barWidth + barWidth / 2, // Center text horizontally
          margin.top + height + 20 // Place text below the x-axis
        );
      }

      // Draw x-axis
      ctx.beginPath();
      ctx.moveTo(margin.left, margin.top +  maxx/ rend * height);
      ctx.lineTo(margin.left + width, margin.top +  maxx/ rend * height);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();




      ctx.beginPath();
      ctx.moveTo(margin.left + 1 * barWidth + 10, margin.top + ((maxx/rend*height)-(this.data[1]/rend*height)) );
      ctx.lineTo(margin.left + 2 * barWidth + 10, margin.top + ((maxx/rend*height)-(this.data[1]/rend*height)) );
      ctx.strokeStyle = "rgb(191, 191, 191)";
      ctx.lineWidth = 1;
      ctx.stroke();


      ctx.beginPath();
      ctx.moveTo(margin.left + 2 * barWidth + 10, margin.top + ((maxx/rend*height)-(this.data[3]/rend*height)) );
      ctx.lineTo(margin.left + 3 * barWidth + 10, margin.top + ((maxx/rend*height)-(this.data[3]/rend*height)));
      ctx.strokeStyle = "rgb(191, 191, 191)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  customElements.define("bar-plot", BarPlot);

})();
