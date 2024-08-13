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
      this.data = [10, 20, 30, 40, 100,120,140];
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

  onCustomWidgetAfterUpdate (oChangedProperties) {
    this.render();
  }

    onCustomWidgetResize(width, height) {
      this.render();
    }

    async render() {
      // Get the canvas context
      const dataBinding = this.myDataBinding;
      if (!dataBinding || dataBinding.state !== 'success') { 


      const ctx = this.canvas.getContext("2d");
      ctx.drawImage('./reply.png', 0, 0);

       }
      else {
        
        this.data1 = [];
        var rawMeasures = dataBinding.data[0]; // Select the first item in the 'data' array
        this.data1 = Object.keys(rawMeasures).map(key => rawMeasures[key].raw);
          
      }

      this.data= [this.data1[0],this.data1[1],this.data1[2],this.data1[3],this.data1[4],this.data1[3]+this.data1[4]-this.data1[1],this.data1[3]+this.data1[4]-this.data1[0] ]
      this.data2= [this.data1[0],this.data1[1],this.data1[2],this.data1[3],this.data1[4],this.data1[3]+this.data1[4]-this.data1[1],this.data1[3]+this.data1[4]-this.data1[0],this.data1[8],this.data1[9],this.data1[10] ]
      const ctx = this.canvas.getContext("2d");

      // Clear the canvas
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Set up canvas size
      this.canvas.width = this._shadowRoot.getElementById("root").clientWidth;
      this.canvas.height = this._shadowRoot.getElementById("root").clientHeight;

      const margin = { top: 20, right: 10, bottom: 30, left: 10 };
      const width = this.canvas.width - margin.left - margin.right;
      const height = this.canvas.height - margin.top - margin.bottom;

      const barWidth = width / 7;
      
      const columnLabels = ['INITIAL', 'ROLLING', 'ACTUAL ', '  FORECAST', 'FY','GAP INIT  ', '  GAP ROLL'];



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
      for (let i = 0; i < 7; i++) {
        let d = this.data[i];
        let barColor;
        if (i === 0 || i === 1) barColor = "rgb(33, 168, 40)"; // First number in green
        else if (i === 5 || i === 6) barColor = "rgb(214, 47, 47)";
        else if (i === 4) barColor = "rgb(64, 64, 64)";// Last number in red
        else barColor = "rgb(191, 191, 191"; // Other numbers in grey


        if (i===0 || i===1) {
        ctx.fillStyle = barColor;
        ctx.fillRect(
          margin.left + i * barWidth + 10 , // Add some separation between bars
          margin.top + ((maxx/rend*height)-(d/rend*height)) ,
          barWidth - 20, // Reduce the width to include separation
          d / rend * height
        );
        }else if (i===2) {
          let d = this.data[3];
       ctx.fillStyle = barColor;
        ctx.fillRect(
          margin.left + i * barWidth + 10 , // Add some separation between bars
          margin.top + ((maxx/rend*height)-(d/rend*height)),
          barWidth - 20, // Reduce the width to include separation
          d / rend * height
        );

        }

          else if (i===4) {
          let d = this.data[2];
       ctx.fillStyle = barColor;
        ctx.fillRect(
          margin.left + i * barWidth + 10 , // Add some separation between bars
          margin.top + ((maxx/rend*height)-(d/rend*height)),
          barWidth - 20, // Reduce the width to include separation
          d / rend * height
        );

        }
            else if (i===5) {
              let d = this.data[6];
              if (d<0) {
          
       ctx.fillStyle = barColor;
        ctx.fillRect(
          margin.left + i * barWidth + 10, // Add some separation between bars
          margin.top +  maxx/ rend * height,
          barWidth - 20, // Reduce the width to include separation
          -d / rend * height
        );}

        else {
          ctx.fillStyle = "rgb(33, 168, 40)";
        ctx.fillRect(
          margin.left + i * barWidth + 10, // Add some separation between bars
          margin.top +  maxx/ rend * height,
          barWidth - 20, // Reduce the width to include separation
          -d / rend * height
        );
        }

        }
              else if (i===6) {
          let d = this.data[5];

          if (d<0) {
       ctx.fillStyle = barColor;
        ctx.fillRect(
          margin.left + i * barWidth + 10, // Add some separation between bars
          margin.top +  maxx/ rend * height,
          barWidth - 20, // Reduce the width to include separation
          -d / rend * height
        );}

        else {
          ctx.fillStyle = "rgb(33, 168, 40)";
        ctx.fillRect(
          margin.left + i * barWidth + 10, // Add some separation between bars
          margin.top +  maxx/ rend * height,
          barWidth - 20, // Reduce the width to include separation
          -d / rend * height
        );
        }

        }
              
          
        else if (i===3) {
          let d = this.data[4];
          d =  this.data[i+1] ;
          ctx.fillStyle = barColor;
          ctx.fillRect(
            margin.left + i * barWidth + 10 , // Add some separation between bars
            margin.top + ((maxx/rend*height)-(this.data[i+1]/rend*height) -(this.data[i]/rend*height)),
            barWidth - 20, // Reduce the width to include separation
            d / rend * height
          );
          
          //ctx.fillStyle = "rgba(255, 255, 255, 1)";  da scambiare con quello sopra
          //ctx.fillRect(
          //  margin.left + i * barWidth + 10, // Add some separation between bars
          //  margin.top + (1 - (this.data[i+1]+this.data[i]) / rend) * height,
          //  barWidth - 20, // Reduce the width to include separation
          //  this.data[i+1] / rend * height
         // );

        }
        else {

        ctx.fillStyle = barColor;
        ctx.fillRect(
          margin.left + i * barWidth + 10, // Add some separation between bars
          margin.top + (1 - d / rend) * height,
          barWidth - 20, // Reduce the width to include separation
          d / rend * height
        );

        }

        



        //INIZIO SCRITTURA PERCENTUALI
        if (i===0 || i===1) {
          d = this.data[i];
          const formattedInnerValue = this.formatter.format(d);
          ctx.fillStyle = "black";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        formattedInnerValue, // Convert value to string
        margin.left + i * barWidth + barWidth / 2, // Center text horizontally
        margin.top + ((maxx/rend*height)-(d/rend*height)) - 5 // Place text above the bar
      );

      d = ((this.data1[1]/this.data1[10])*100);
          console.log(this.data1[1]);
          console.log(this.data1[10]);
let FformattedInnerValue = this.formatter.format(d);
let textToDisplay = `${FformattedInnerValue}%`; // Add percentage symbol

ctx.fillStyle = "black";
ctx.font = "12px Arial";
ctx.textAlign = "center";
ctx.fillText(
  textToDisplay, // Use the new string with the percentage symbol
  margin.left + i * barWidth + barWidth / 2, // Center text horizontally
  margin.top + height + 28 // Place text above the bar
);

    
        }
           else if (i===2) {
             d = this.data[3];
          const formattedInnerValue = this.formatter.format(d);
          ctx.fillStyle = "black";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        formattedInnerValue, // Convert value to string
        margin.left + i * barWidth + barWidth / 2, // Center text horizontally
        margin.top + ((maxx/rend*height)-(d/rend*height)) - 5 // Place text above the bar
      );

      d = (this.data2[3]/this.data2[8])*100;
let FformattedInnerValue = this.formatter.format(d);
let textToDisplay = `${FformattedInnerValue}%`; // Add percentage symbol

ctx.fillStyle = "black";
ctx.font = "12px Arial";
ctx.textAlign = "center";
ctx.fillText(
  textToDisplay, // Use the new string with the percentage symbol
  margin.left + i * barWidth + barWidth / 2, // Center text horizontally
  margin.top + height + 28 // Place text above the bar
);
        }

        else if (i===3) {
          d = this.data[4];
          if (d>=0){
       const formattedInnerValue = this.formatter.format(d);
       ctx.fillStyle = "black";
   ctx.font = "12px Arial";
   ctx.textAlign = "center";
   ctx.fillText(
     formattedInnerValue, // Convert value to string
     margin.left + i * barWidth + barWidth / 2, // Center text horizontally
     margin.top + ((maxx/rend*height)-(this.data[i+1]/rend*height) -(this.data[i]/rend*height)) - 5 // Place text above the bar
   );}

   else {const formattedInnerValue = this.formatter.format(d);
    ctx.fillStyle = "black";
ctx.font = "12px Arial";
ctx.textAlign = "center";
ctx.fillText(
  formattedInnerValue, // Convert value to string
  margin.left + i * barWidth + barWidth / 2, // Center text horizontally
  margin.top + ((maxx/rend*height)-(this.data[3]/rend*height)) - 5 // Place text above the bar
);}


d= (this.data2[4]/this.data2[9])*100;
let FformattedInnerValue = this.formatter.format(d);
let textToDisplay = `${FformattedInnerValue}%`; // Add percentage symbol

ctx.fillStyle = "black";
ctx.font = "12px Arial";
ctx.textAlign = "center";
ctx.fillText(
  textToDisplay, // Use the new string with the percentage symbol
  margin.left + i * barWidth + barWidth / 2, // Center text horizontally
  margin.top + height + 28 // Place text above the bar
);
     }


     else if (i===4) {
      d = this.data[2];

      if (d>=0){
   const formattedInnerValue = this.formatter.format(d);
   ctx.fillStyle = "black";
ctx.font = "12px Arial";
ctx.textAlign = "center";
ctx.fillText(
 formattedInnerValue, // Convert value to string
 margin.left + i * barWidth + barWidth / 2, // Center text horizontally
 margin.top + ((maxx/rend*height)-(d/rend*height)) - 5 // Place text above the bar
);}

else{
  const formattedInnerValue = this.formatter.format(d);
   ctx.fillStyle = "black";
ctx.font = "12px Arial";
ctx.textAlign = "center";
ctx.fillText(
 formattedInnerValue, // Convert value to string
 margin.left + i * barWidth + barWidth / 2, // Center text horizontally
 margin.top +  maxx/ rend * height  - 5 // Place text above the bar
);
}

d= (this.data2[2]/this.data2[7])*100;
let FformattedInnerValue = this.formatter.format(d);
let textToDisplay = `${FformattedInnerValue}%`; // Add percentage symbol

ctx.fillStyle = "black";
ctx.font = "12px Arial";
ctx.textAlign = "center";
ctx.fillText(
  textToDisplay, // Use the new string with the percentage symbol
  margin.left + i * barWidth + barWidth / 2, // Center text horizontally
  margin.top + height + 28 // Place text above the bar
);


 }


 else if (i===5) {
  d = this.data[6];

  if (d<0) {
const formattedInnerValue = this.formatter.format(d);
ctx.fillStyle = "black";
ctx.font = "12px Arial";
ctx.textAlign = "center";
ctx.fillText(
formattedInnerValue, // Convert value to string
margin.left + i * barWidth + barWidth / 2, // Center text horizontally
margin.top +  maxx/ rend * height - 5 // Place text above the bar
);}

else {const formattedInnerValue = this.formatter.format(d);
  ctx.fillStyle = "black";
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
  formattedInnerValue, // Convert value to string
  margin.left + i * barWidth + barWidth / 2, // Center text horizontally
  margin.top +  maxx/ rend * height -d / rend * height - 5 // Place text above the bar
  );}


  d= (this.data2[6]/this.data2[0])*100;
let FformattedInnerValue = this.formatter.format(d);
let textToDisplay = `${FformattedInnerValue}%`; // Add percentage symbol

ctx.fillStyle = "black";
ctx.font = "12px Arial";
ctx.textAlign = "center";
ctx.fillText(
  textToDisplay, // Use the new string with the percentage symbol
  margin.left + i * barWidth + barWidth / 2, // Center text horizontally
  margin.top + height + 28 // Place text above the bar
);
}


else if (i===6) {
  d = this.data[5];


  if (d<0) {
const formattedInnerValue = this.formatter.format(d);
ctx.fillStyle = "black";
ctx.font = "12px Arial";
ctx.textAlign = "center";
ctx.fillText(
formattedInnerValue, // Convert value to string
margin.left + i * barWidth + barWidth / 2, // Center text horizontally
margin.top +  maxx/ rend * height - 5 // Place text above the bar
);}

else {const formattedInnerValue = this.formatter.format(d);
  ctx.fillStyle = "black";
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
  formattedInnerValue, // Convert value to string
  margin.left + i * barWidth + barWidth / 2, // Center text horizontally
  margin.top +  maxx/ rend * height -d / rend * height - 5 // Place text above the bar
  );}


  d= (this.data2[5]/this.data2[1])*100;
let FformattedInnerValue = this.formatter.format(d);
let textToDisplay = `${FformattedInnerValue}%`; // Add percentage symbol

ctx.fillStyle = "black";
ctx.font = "12px Arial";
ctx.textAlign = "center";
ctx.fillText(
  textToDisplay, // Use the new string with the percentage symbol
  margin.left + i * barWidth + barWidth / 2, // Center text horizontally
  margin.top + height + 28 // Place text above the bar
);
}

    //QUA//QUA//QUA//QUA//QUA



    


        


      ctx.fillStyle = "black";
      ctx.font = "11px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
      columnLabels[i], // Column label
      margin.left + i * barWidth + barWidth / 2, // Center text horizontally
      margin.top + height + 14 // Place text below the x-axis
    );
      }
      
      ctx.beginPath();
      ctx.moveTo(margin.left, margin.top + maxx/ rend * height );
      ctx.lineTo(margin.left + width, margin.top +  maxx/ rend * height);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();



      ctx.beginPath();
      ctx.moveTo(margin.left + 2 * barWidth + 10, margin.top + ((maxx/rend*height)-(this.data[3]/rend*height)) );
      ctx.lineTo(margin.left + 3 * barWidth + 10, margin.top + ((maxx/rend*height)-(this.data[3]/rend*height)) );
      ctx.strokeStyle = "rgb(191, 191, 191)";
      ctx.lineWidth = 1;
      ctx.stroke();


      ctx.beginPath();
      ctx.moveTo(margin.left + 3 * barWidth + 10, margin.top + ((maxx/rend*height)-(this.data[3+1]/rend*height) -(this.data[3]/rend*height)) );
      ctx.lineTo(margin.left + 4 * barWidth + 10, margin.top + ((maxx/rend*height)-(this.data[3+1]/rend*height) -(this.data[3]/rend*height)));
      ctx.strokeStyle = "rgb(191, 191, 191)";
      ctx.lineWidth = 1;
      ctx.stroke();

      

    }
  }
  customElements.define("bar-plot-saving", BarPlot);

})();
