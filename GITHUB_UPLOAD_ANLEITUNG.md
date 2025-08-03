# 📤 GitHub Upload Anleitung

## Option 1: Über GitHub Web Interface (Einfachste Methode)

### 1. Gehen Sie zu Ihrem Repository
- Öffnen Sie: https://github.com/BLCdetlef/BLChart
- Klicken Sie auf "Add file" → "Upload files"

### 2. Dateien hochladen
Ziehen Sie diese Dateien in das Upload-Fenster:
- `index.html` (neue Version)
- `script.js` (neue Version)
- `README.md` (neue Version)
- `UGTemperaturanstieg.csv`
- `WKCO2Emissionen.csv`
- `UNKunststoffproduktion.csv`

### 3. Commit erstellen
- **Commit message**: "Add planetare Grenzen dashboard with naming convention system"
- **Description**: "Implementiert interaktives Dashboard für planetare Grenzen mit Namenskonventionssystem (U/W für Ursache/Wirkung, G/K/N für Global/Kontinental/National)"

### 4. Commit & Push
- Klicken Sie auf "Commit changes"

## Option 2: Git über PowerShell (Falls Git installiert ist)

```powershell
# Git initialisieren (falls noch nicht geschehen)
git init

# Remote Repository hinzufügen
git remote add origin https://github.com/BLCdetlef/BLChart.git

# Alle Dateien hinzufügen
git add .

# Commit erstellen
git commit -m "Add planetare Grenzen dashboard with naming convention system"

# Push zu GitHub
git push -u origin main
```

## Option 3: GitHub Desktop (Visuell)

1. **GitHub Desktop installieren**: https://desktop.github.com/
2. **Repository klonen**: File → Clone Repository → BLCdetlef/BLChart
3. **Dateien hinzufügen**: Alle neuen Dateien in den Ordner kopieren
4. **Commit & Push**: Summary eingeben und "Commit to main" klicken

## 🧪 Testen nach dem Upload

### 1. GitHub Pages aktivieren
- Gehen Sie zu Settings → Pages
- Source: "Deploy from a branch"
- Branch: "main"
- Folder: "/ (root)"
- Save

### 2. Dashboard testen
- Nach einigen Minuten ist das Dashboard verfügbar unter:
- https://blcdetlef.github.io/BLChart/

### 3. Funktionalität prüfen
- ✅ Beispieldaten werden automatisch geladen
- ✅ Namenskonventionssystem funktioniert
- ✅ Interaktive Steuerung
- ✅ Verlinkbare Datenpunkte

## 📁 Dateien die hochgeladen werden müssen

### Neue/Geänderte Dateien:
- `index.html` - Modernes Dashboard Interface
- `script.js` - Komplette JavaScript-Logik
- `README.md` - Ausführliche Dokumentation

### Neue CSV-Beispieldaten:
- `UGTemperaturanstieg.csv` - Ursache, Global
- `WKCO2Emissionen.csv` - Wirkung, Kontinental
- `UNKunststoffproduktion.csv` - Ursache, National

## 🎯 Namenskonventionssystem

Das System erkennt automatisch:
- **U** = Ursache (gelbe Linien)
- **W** = Wirkung (rote Linien)
- **G** = Global (durchgehende Linien)
- **K** = Kontinental (gestrichelte Linien)
- **N** = National (gepunktete Linien)

**Beispiel**: `UGTemperaturanstieg.csv` = Ursache, Global, "Temperaturanstieg"

## 🚀 Nach dem Upload

1. **Dashboard öffnen**: https://blcdetlef.github.io/BLChart/
2. **Beispieldaten testen**: Sollten automatisch geladen werden
3. **Eigene CSV-Dateien hochladen**: Nach Namenskonvention benennen
4. **Interaktivität testen**: Hover, Klicks, Filter

---

**Viel Erfolg beim Upload!** 🚀 