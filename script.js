document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form').addEventListener('change', function(event) {
        event.preventDefault();

        let derivative = document.getElementById('derivative').value;

        if(derivative == 'first')
        {
            document.getElementsByClassName('opt_1')[0].style.display = 'block';
            document.getElementsByClassName('opt_2')[0].style.display = 'none';
            document.getElementById('tableTitle').style.display = 'none';
            document.getElementById('results1').style.display = 'none';
            document.getElementById('results2').style.display = 'none';
            document.getElementById('conclusion').style.display = 'none';
            document.getElementById('graph').style.display = 'none';
        }

        else if(derivative == 'second')
        {
            document.getElementsByClassName('opt_2')[0].style.display = 'block';
            document.getElementsByClassName('opt_1')[0].style.display = 'none';
            document.getElementById('tableTitle').style.display = 'none';
            document.getElementById('results1').style.display = 'none';
            document.getElementById('results2').style.display = 'none';
            document.getElementById('conclusion').style.display = 'none';
            document.getElementById('graph').style.display = 'none';
        }

        else if(derivative == 'na')
        {
            document.getElementsByClassName('opt_1')[0].style.display = 'none';
            document.getElementsByClassName('opt_2')[0].style.display = 'none';
            document.getElementById('tableTitle').style.display = 'none';
            document.getElementById('results1').style.display = 'none';
            document.getElementById('results2').style.display = 'none';
            document.getElementById('conclusion').style.display = 'none';
            document.getElementById('graph').style.display = 'none';
        }
    });

    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();

        let derivative = document.getElementById('derivative').value;

        document.getElementById('tableBody1').innerHTML = '';
        document.getElementById('results1').style.display = 'none';
        document.getElementById('tableBody2').innerHTML = '';
        document.getElementById('results2').style.display = 'none';

        if(derivative == 'first')
        {
            let inputfn = document.getElementById('equation').value;
            let x0 = parseFloat(document.getElementById('x0').value);
            let y0 = parseFloat(document.getElementById('y0').value);
            let xn = parseFloat(document.getElementById('xn').value);
            let h = parseFloat(document.getElementById('step').value);

            let f = new Function('x', 'y', 'return ' + inputfn);

            let x_val = [], y_val = [];
            let k1_val = [], k2_val = [], k3_val = [], k4_val = [];
            let x = x0, y = y0;
            let k1 = k2 = k3 = k4 = 0;

            x_val.push(x);
            y_val.push(y);
            k1_val.push(k1);
            k2_val.push(k2);
            k3_val.push(k3);
            k4_val.push(k4);

            let n = Math.floor((xn - x0) / h);

            for(let i = 0; i < n; i++)
            {
                k1 = h * f(x, y);
                k2 = h * f((x + (h/2)), (y + (k1/2)));
                k3 = h * f((x + (h/2)), (y + (k2/2)));
                k4 = h * f((x + h), (y + k3));

                let k = (k1 + 2*k2 + 2*k3 + k4) / 6;

                y += k;
                x += h;
                
                x_val.push(x);
                y_val.push(y);
                k1_val.push(k1);
                k2_val.push(k2);
                k3_val.push(k3);
                k4_val.push(k4);
            }

            let value = y_val[y_val.length - 1].toFixed(5);
            let message = `∴ y(${xn}) ≈ ${value}`;

            let concludeDiv = document.createElement('div');
            concludeDiv.innerHTML = message;

            let concludeContainer = document.getElementById('conclusion');
            concludeContainer.innerHTML = '';
            concludeContainer.appendChild(concludeDiv);

            document.getElementById('conclusion').style.display = 'block';
            
            document.getElementById('tableTitle').style.display = 'block';
            document.getElementById('results1').style.display = 'block';

            let tableBody1 = document.getElementById('tableBody1');
            for (let i = 0; i < x_val.length; i++) 
            {
                let row = document.createElement('tr');
                row.innerHTML = `<td>${i}</td><td>${x_val[i].toFixed(5)}</td><td>${k1_val[i].toFixed(5)}</td><td>${k2_val[i].toFixed(5)}</td><td>${k3_val[i].toFixed(5)}</td><td>${k4_val[i].toFixed(5)}</td><td>${y_val[i].toFixed(5)}</td>`;
                tableBody1.appendChild(row);
            }

            document.getElementById('graph').style.display = 'block';
            plotGraph1(x_val, y_val);
        }

        else if(derivative == 'second')
        {
            let inputfn = document.getElementById('equation_2').value;
            let x0 = parseFloat(document.getElementById('x0_2').value);
            let y0 = parseFloat(document.getElementById('y0_2').value);
            let z0 = parseFloat(document.getElementById('z0').value);
            let xn = parseFloat(document.getElementById('xn_2').value);
            let h = parseFloat(document.getElementById('step_2').value);

            let f = new Function('x', 'y', 'z', 'return z;');
            let g = new Function('x', 'y', 'z', 'return ' + inputfn);

            let x_val = [], y_val = [], z_val = [];
            let k1_val = [], k2_val = [], k3_val = [], k4_val = [];
            let l1_val = [], l2_val = [], l3_val = [], l4_val = [];
            let x = x0, y = y0, z = z0;
            let k1 = k2 = k3 = k4 = 0;
            let l1 = l2 = l3 = l4 = 0;

            x_val.push(x);
            y_val.push(y);
            z_val.push(z);
            k1_val.push(k1);
            k2_val.push(k2);
            k3_val.push(k3);
            k4_val.push(k4);
            l1_val.push(l1);
            l2_val.push(l2);
            l3_val.push(l3);
            l4_val.push(l4);

            let n = Math.floor((xn - x0) / h);

            for(let i = 0; i < n; i++)
            {
                k1 = h * f(x, y, z);
                l1 = h * g(x, y, z);
                k2 = h * f((x + h/2), (y + k1/2), (z + l1/2));
                l2 = h * g((x + h/2), (y + k1/2), (z + l1/2));
                k3 = h * f((x + h/2), (y + k2/2), (z + l2/2));
                l3 = h * g((x + h/2), (y + k2/2), (z + l2/2));
                k4 = h * f((x + h), (y + k3), (z + l3));
                l4 = h * g((x + h), (y + k3), (z + l3));

                let k = (k1 + 2*k2 + 2*k3 + k4) / 6;
                let l = (l1 + 2*l2 + 2*l3 + l4) / 6;

                y += k;
                x += h;
                z += l;

                x_val.push(x);
                y_val.push(y);
                z_val.push(z);
                k1_val.push(k1);
                k2_val.push(k2);
                k3_val.push(k3);
                k4_val.push(k4);
                l1_val.push(l1);
                l2_val.push(l2);
                l3_val.push(l3);
                l4_val.push(l4);
            }

            let value = y_val[y_val.length - 1].toFixed(5);
            let message = `∴ y(${xn}) ≈ ${value}`;

            let concludeDiv = document.createElement('div');
            concludeDiv.innerHTML = message;

            let concludeContainer = document.getElementById('conclusion');
            concludeContainer.innerHTML = '';
            concludeContainer.appendChild(concludeDiv);

            document.getElementById('conclusion').style.display = 'block';

            document.getElementById('tableTitle').style.display = 'block';
            document.getElementById('results2').style.display = 'block';

            let tableBody2 = document.getElementById('tableBody2');
            for (let i = 0; i < x_val.length; i++) 
            {
                let row = document.createElement('tr');
                row.innerHTML = `<td>${i}</td><td>${x_val[i].toFixed(5)}</td><td>${k1_val[i].toFixed(5)}</td><td>${l1_val[i].toFixed(5)}</td><td>${k2_val[i].toFixed(5)}</td><td>${l2_val[i].toFixed(5)}</td><td>${k3_val[i].toFixed(5)}</td><td>${l3_val[i].toFixed(5)}</td><td>${k4_val[i].toFixed(5)}</td><td>${l4_val[i].toFixed(5)}</td><td>${y_val[i].toFixed(5)}</td><td>${z_val[i].toFixed(5)}</td>`;
                tableBody2.appendChild(row);
            }

            document.getElementById('graph').style.display = 'block';
            plotGraph2(x_val, y_val, z_val);
        }

        function plotGraph1(xval, yval) 
        {
            var trace1 = {
                x: xval,
                y: yval,
                mode: 'lines',
                };

            var data = [trace1];

            var layout = {
                title: 'Graph',
                xaxis: {
                    title: 'x',
                },
                yaxis: {
                    title: 'y',
                }
                };

            Plotly.newPlot('graph', data, layout);
        }

        function plotGraph2(xval, yval, zval)
        {
            var trace1 = {
                x: xval,
                y: yval,
                z: zval,
                mode: 'lines',
                type: 'scatter3d'
            };

            var data = [trace1];

            var layout = {
                autosize: true,
                title: 'Graph',
                scene: {
                    xaxis: {
                        title: 'x',
                    },
                    yaxis: {
                        title: 'y',
                    },
                    zaxis: {
                        title: 'z (= dy/dx)'
                    }
                }
            }
            Plotly.newPlot('graph', data, layout);
        }
    });
});
