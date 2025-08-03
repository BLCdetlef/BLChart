# 🌍 Planetare Grenzen - Interaktive Datenvisualisierung

Ein modernes Dashboard zur Visualisierung von Ursache-Wirkung-Beziehungen bei planetaren Grenzen.

## 📋 Namenskonventionssystem

### Dateinamen-Struktur
```
[U/W][G/K/N][Beschreibung].csv
```

**Beispiele:**
- `UGTemperaturanstieg.csv` = Ursache, Global, "Temperaturanstieg"
- `WKCO2Emissionen.csv` = Wirkung, Kontinental, "CO2Emissionen"
- `UNKunststoffproduktion.csv` = Ursache, National, "Kunststoffproduktion"

### Codierung

| Position | Bedeutung | Optionen | Visuelle Darstellung |
|----------|-----------|----------|---------------------|
| 1. Zeichen | Typ | `U` = Ursache<br>`W` = Wirkung | 🟡 Gelb (Ursache)<br>🔴 Rot (Wirkung) |
| 2. Zeichen | Scope | `G` = Global<br>`K` = Kontinental<br>`N` = National | ─── Durchgehend (Global)<br>┄┄┄ Gestrichelt (Kontinental)<br>┈┈┈ Gepunktet (National) |
| 3.-32. Zeichen | Beschreibung | Max. 30 Zeichen | Wird als Legende angezeigt |

## 📊 CSV-Datenformat

### Erwartetes Format
```csv
Jahr,Wert
1700,10
1800,15
1900,25
2000,45
2020,65
2050,80
2100,95
```

### Datenvalidierung
- **Jahr**: 1700-2100
- **Wert**: 0-100
- **Spaltennamen**: `Jahr`, `year`, `Year` oder `Wert`, `value`, `Value`

## 🚀 Verwendung

### 1. Dashboard öffnen
Öffnen Sie `index.html` in einem modernen Webbrowser.

### 2. CSV-Dateien hochladen
- Klicken Sie auf "📁 CSV-Dateien hochladen"
- Wählen Sie eine oder mehrere CSV-Dateien aus
- Die Dateien werden automatisch nach dem Namenskonventionssystem verarbeitet

### 3. Interaktive Steuerung
- **Anzeige-Einstellungen**: Ein-/ausblenden von Ursachen, Wirkungen, Global, Kontinental, National
- **Jahr-Bereich**: Anpassung der X-Achse (1700-2100)
- **Y-Achse**: Anpassung der Werte-Skala (0-100)

### 4. Datenpunkte verlinken
- **Hover**: Zeigt detaillierte Informationen zu Datenpunkten
- **Klick**: Erstellt eindeutige IDs für Verlinkung
- **Format**: `[Dateiname]_[Jahr]_[Index]`

## 📝 Beispiele für Dateinamen

### Ursachen (Gelb)
- `UGTemperaturanstieg.csv` - Globaler Temperaturanstieg
- `UKCO2Konzentration.csv` - Kontinentale CO2-Konzentration
- `UNIndustrieproduktion.csv` - Nationale Industrieproduktion

### Wirkungen (Rot)
- `WGMeeresspiegel.csv` - Globaler Meeresspiegelanstieg
- `WKEisverlust.csv` - Kontinentaler Eisverlust
- `WNOzeanversauerung.csv` - Nationale Ozeanversauerung

## 🎨 Features

### Automatische Styling
- **Farben**: Gelb für Ursachen, Rot für Wirkungen
- **Linienarten**: Durchgehend (Global), gestrichelt (Kontinental), gepunktet (National)
- **Interaktivität**: Hover-Effekte, Klick-Events, Tooltips

### Responsive Design
- Moderne, mobile-freundliche Benutzeroberfläche
- Anpassbare Chart-Größe
- Touch-optimierte Bedienung

### Datenverwaltung
- Drag & Drop Datei-Upload
- Einzelne Datensätze ein-/ausblendbar
- Dateien können entfernt werden
- Echtzeit-Updates

## 🔧 Technische Details

### Verwendete Technologien
- **Chart.js**: Interaktive Charts
- **Papa Parse**: CSV-Parsing
- **Vanilla JavaScript**: Moderne ES6+ Syntax
- **CSS Grid/Flexbox**: Responsive Layout

### Browser-Kompatibilität
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📚 Bildungsanwendung

### Lernziele
1. **Datenvisualisierung**: Verständnis von Ursache-Wirkung-Beziehungen
2. **Planetare Grenzen**: Erkennung von Umweltproblemen
3. **Datenanalyse**: Interpretation von Trends und Mustern
4. **Interaktivität**: Engagement durch klickbare Datenpunkte

### Unterrichtsaktivitäten
- **Datensammlung**: Studierende erstellen eigene CSV-Dateien
- **Vergleichsanalysen**: Global vs. kontinental vs. national
- **Trendanalyse**: Identifikation von kritischen Zeitpunkten
- **Präsentation**: Verwendung der eindeutigen Datenpunkt-IDs für Referenzen

## 🐛 Fehlerbehebung

### Häufige Probleme
1. **Datei wird nicht geladen**: Überprüfen Sie das CSV-Format
2. **Falsche Farben**: Überprüfen Sie die Namenskonvention (U/W am Anfang)
3. **Keine Linien**: Überprüfen Sie die Scope-Codierung (G/K/N)
4. **Fehlende Legende**: Beschreibung muss nach der Codierung folgen

### Debugging
- Öffnen Sie die Browser-Konsole (F12)
- Überprüfen Sie die Netzwerk-Tab für Datei-Uploads
- Validieren Sie CSV-Daten mit einem Texteditor

## 📞 Support

Bei Fragen oder Problemen:
1. Überprüfen Sie die Namenskonvention
2. Validieren Sie das CSV-Format
3. Testen Sie mit den Beispieldaten
4. Konsultieren Sie die Browser-Konsole für Fehlermeldungen

---

**Entwickelt für Bildungszwecke** - Planetare Grenzen verstehen durch interaktive Datenvisualisierung 🌍 