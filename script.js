// Planetare Grenzen Dashboard - JavaScript
class PlanetChart {
    constructor() {
        this.chart = null;
        this.datasets = [];
        this.uploadedFiles = new Map();
        this.dataPoints = new Map(); // Für verlinkbare Datenpunkte
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createChart();
        this.loadSampleData();
    }

    setupEventListeners() {
        // File Upload
        document.getElementById('csv-upload').addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
        });

        // Controls
        document.getElementById('show-ursache').addEventListener('change', () => this.updateChart());
        document.getElementById('show-wirkung').addEventListener('change', () => this.updateChart());
        document.getElementById('show-global').addEventListener('change', () => this.updateChart());
        document.getElementById('show-kontinental').addEventListener('change', () => this.updateChart());
        document.getElementById('show-national').addEventListener('change', () => this.updateChart());
        
        document.getElementById('year-from').addEventListener('change', () => this.updateChart());
        document.getElementById('year-to').addEventListener('change', () => this.updateChart());
        document.getElementById('y-min').addEventListener('change', () => this.updateChart());
        document.getElementById('y-max').addEventListener('change', () => this.updateChart());
    }

    createChart() {
        const ctx = document.getElementById('planetChart').getContext('2d');
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Planetare Grenzen - Ursache & Wirkung',
                        font: {
                            size: 16
                        }
                    },
                    legend: {
                        display: false // Wir verwenden unsere eigene Legende
                    },
                    tooltip: {
                        callbacks: {
                            title: function(context) {
                                return `Jahr: ${context[0].label}`;
                            },
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Jahr'
                        },
                        min: 1700,
                        max: 2100
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Wert (0-100)'
                        },
                        min: 0,
                        max: 100
                    }
                },
                onClick: (event, elements) => {
                    this.handleChartClick(event, elements);
                },
                onHover: (event, elements) => {
                    this.handleChartHover(event, elements);
                }
            }
        });
    }

    // Namenskonventions-Parser
    parseFileName(filename) {
        const nameWithoutExt = filename.replace('.csv', '');
        
        // Erste zwei Zeichen für Ursache/Wirkung und Global/Kontinental/National
        const type = nameWithoutExt.charAt(0); // U oder W
        const scope = nameWithoutExt.charAt(1); // G, K oder N
        
        // Rest ist der Beschreibungsname (max 30 Zeichen)
        const description = nameWithoutExt.substring(2, 32);
        
        return {
            type: type, // 'U' oder 'W'
            scope: scope, // 'G', 'K' oder 'N'
            description: description,
            filename: filename
        };
    }

    // Linien-Styling basierend auf Namenskonvention
    getLineStyle(parsedName) {
        const styles = {
            color: parsedName.type === 'U' ? '#ffc107' : '#dc3545', // Gelb für Ursache, Rot für Wirkung
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: false
        };

        // Linienart basierend auf Scope
        switch(parsedName.scope) {
            case 'G': // Global - durchgehende Linie
                styles.borderDash = [];
                break;
            case 'K': // Kontinental - gestrichelt
                styles.borderDash = [10, 5];
                break;
            case 'N': // National - gepunktet
                styles.borderDash = [2, 2];
                break;
        }

        return styles;
    }

    handleFileUpload(files) {
        Array.from(files).forEach(file => {
            if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
                this.parseCSVFile(file);
            }
        });
    }

    parseCSVFile(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const csv = e.target.result;
            const parsedName = this.parseFileName(file.name);
            
            Papa.parse(csv, {
                header: true,
                complete: (results) => {
                    this.processCSVData(results.data, parsedName, file.name);
                    this.addFileToList(file.name);
                },
                error: (error) => {
                    console.error('CSV Parse Error:', error);
                    alert(`Fehler beim Parsen von ${file.name}: ${error.message}`);
                }
            });
        };
        
        reader.readAsText(file);
    }

    processCSVData(data, parsedName, filename) {
        // Daten validieren und verarbeiten
        const validData = data.filter(row => {
            const year = parseInt(row.Jahr || row.year || row.Year);
            const value = parseFloat(row.Wert || row.value || row.Value);
            return !isNaN(year) && !isNaN(value) && year >= 1700 && year <= 2100 && value >= 0 && value <= 100;
        });

        if (validData.length === 0) {
            alert(`Keine gültigen Daten in ${filename} gefunden. Erwartetes Format: Jahr,Wert`);
            return;
        }

        // Daten sortieren nach Jahr
        validData.sort((a, b) => {
            const yearA = parseInt(a.Jahr || a.year || a.Year);
            const yearB = parseInt(b.Jahr || b.year || b.Year);
            return yearA - yearB;
        });

        // Datenpunkte für Verlinkung speichern
        validData.forEach((row, index) => {
            const year = parseInt(row.Jahr || row.year || row.Year);
            const value = parseFloat(row.Wert || row.value || row.Value);
            const pointId = `${filename}_${year}_${index}`;
            this.dataPoints.set(pointId, {
                year: year,
                value: value,
                description: parsedName.description,
                type: parsedName.type,
                scope: parsedName.scope,
                filename: filename
            });
        });

        // Dataset erstellen
        const dataset = {
            label: `${parsedName.description} (${parsedName.type === 'U' ? 'Ursache' : 'Wirkung'}, ${this.getScopeName(parsedName.scope)})`,
            data: validData.map(row => ({
                x: parseInt(row.Jahr || row.year || row.Year),
                y: parseFloat(row.Wert || row.value || row.Value)
            })),
            ...this.getLineStyle(parsedName),
            parsedName: parsedName
        };

        this.uploadedFiles.set(filename, dataset);
        this.updateChart();
        this.updateLegend();
    }

    getScopeName(scope) {
        switch(scope) {
            case 'G': return 'Global';
            case 'K': return 'Kontinental';
            case 'N': return 'National';
            default: return 'Unbekannt';
        }
    }

    addFileToList(filename) {
        const container = document.getElementById('uploaded-files');
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>${filename}</span>
            <button class="remove-file" onclick="planetChart.removeFile('${filename}')">Entfernen</button>
        `;
        container.appendChild(fileItem);
    }

    removeFile(filename) {
        this.uploadedFiles.delete(filename);
        
        // Entferne aus der Dateiliste
        const container = document.getElementById('uploaded-files');
        const items = container.querySelectorAll('.file-item');
        items.forEach(item => {
            if (item.querySelector('span').textContent === filename) {
                item.remove();
            }
        });

        this.updateChart();
        this.updateLegend();
    }

    updateChart() {
        const datasets = [];
        const yearFrom = parseInt(document.getElementById('year-from').value);
        const yearTo = parseInt(document.getElementById('year-to').value);
        const yMin = parseInt(document.getElementById('y-min').value);
        const yMax = parseInt(document.getElementById('y-max').value);

        const showUrsache = document.getElementById('show-ursache').checked;
        const showWirkung = document.getElementById('show-wirkung').checked;
        const showGlobal = document.getElementById('show-global').checked;
        const showKontinental = document.getElementById('show-kontinental').checked;
        const showNational = document.getElementById('show-national').checked;

        this.uploadedFiles.forEach((dataset, filename) => {
            const parsedName = dataset.parsedName;
            
            // Filter basierend auf Einstellungen
            if ((parsedName.type === 'U' && !showUrsache) || 
                (parsedName.type === 'W' && !showWirkung)) {
                return;
            }

            if ((parsedName.scope === 'G' && !showGlobal) ||
                (parsedName.scope === 'K' && !showKontinental) ||
                (parsedName.scope === 'N' && !showNational)) {
                return;
            }

            // Filter Daten nach Jahr-Bereich
            const filteredData = dataset.data.filter(point => 
                point.x >= yearFrom && point.x <= yearTo
            );

            if (filteredData.length > 0) {
                datasets.push({
                    ...dataset,
                    data: filteredData
                });
            }
        });

        this.chart.data.datasets = datasets;
        this.chart.options.scales.x.min = yearFrom;
        this.chart.options.scales.x.max = yearTo;
        this.chart.options.scales.y.min = yMin;
        this.chart.options.scales.y.max = yMax;
        this.chart.update();
    }

    updateLegend() {
        const legendContainer = document.getElementById('legend');
        legendContainer.innerHTML = '';

        this.uploadedFiles.forEach((dataset, filename) => {
            const parsedName = dataset.parsedName;
            const legendItem = document.createElement('div');
            legendItem.className = `legend-item ${parsedName.type === 'U' ? 'ursache' : 'wirkung'}`;
            
            const lineStyle = this.getLineStyle(parsedName);
            const lineClass = parsedName.scope === 'G' ? 'line-solid' : 
                            parsedName.scope === 'K' ? 'line-dashed' : 'line-dotted';
            
            legendItem.innerHTML = `
                <div class="legend-line ${lineClass}" style="border-color: ${lineStyle.color}"></div>
                <span>${parsedName.description}</span>
            `;
            
            legendItem.addEventListener('click', () => {
                this.toggleDataset(filename);
            });
            
            legendContainer.appendChild(legendItem);
        });
    }

    toggleDataset(filename) {
        const dataset = this.uploadedFiles.get(filename);
        if (dataset) {
            dataset.hidden = !dataset.hidden;
            this.updateChart();
        }
    }

    handleChartClick(event, elements) {
        if (elements.length > 0) {
            const element = elements[0];
            const datasetIndex = element.datasetIndex;
            const dataIndex = element.index;
            const dataset = this.chart.data.datasets[datasetIndex];
            const point = dataset.data[dataIndex];
            
            // Erstelle eindeutige ID für den Datenpunkt
            const pointId = `${dataset.parsedName.filename}_${point.x}_${dataIndex}`;
            
            // Hier können Sie die Verlinkung implementieren
            console.log('Klick auf Datenpunkt:', pointId, point);
            alert(`Datenpunkt: ${dataset.label}\nJahr: ${point.x}\nWert: ${point.y.toFixed(2)}\nID: ${pointId}`);
        }
    }

    handleChartHover(event, elements) {
        const infoBox = document.getElementById('data-point-info');
        
        if (elements.length > 0) {
            const element = elements[0];
            const datasetIndex = element.datasetIndex;
            const dataIndex = element.index;
            const dataset = this.chart.data.datasets[datasetIndex];
            const point = dataset.data[dataIndex];
            
            const pointId = `${dataset.parsedName.filename}_${point.x}_${dataIndex}`;
            const pointData = this.dataPoints.get(pointId);
            
            if (pointData) {
                infoBox.innerHTML = `
                    <strong>${pointData.description}</strong><br>
                    Jahr: ${pointData.year}<br>
                    Wert: ${pointData.value.toFixed(2)}<br>
                    Typ: ${pointData.type === 'U' ? 'Ursache' : 'Wirkung'}<br>
                    Scope: ${this.getScopeName(pointData.scope)}<br>
                    ID: ${pointId}
                `;
                infoBox.style.display = 'block';
                infoBox.style.left = event.pageX + 10 + 'px';
                infoBox.style.top = event.pageY - 10 + 'px';
            }
        } else {
            infoBox.style.display = 'none';
        }
    }

    // Beispieldaten laden
    loadSampleData() {
        // Lade die vorhandenen CSV-Dateien automatisch
        const csvFiles = ['UGTemperaturanstieg.csv', 'WKCO2Emissionen.csv', 'UNKunststoffproduktion.csv'];
        
        csvFiles.forEach(filename => {
            fetch(filename)
                .then(response => response.text())
                .then(content => {
                    const blob = new Blob([content], { type: 'text/csv' });
                    const file = new File([blob], filename, { type: 'text/csv' });
                    this.parseCSVFile(file);
                })
                .catch(error => {
                    console.log(`Beispieldatei ${filename} nicht gefunden, überspringe...`);
                });
        });
    }
}

// Initialisierung
let planetChart;
document.addEventListener('DOMContentLoaded', () => {
    planetChart = new PlanetChart();
}); 