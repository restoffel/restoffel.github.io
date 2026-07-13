# Anleitung für die Website

## Neue Seite hinzufügen

1. **Template verwenden**: Kopiere die Datei `TEMPLATE.html` und benenne sie um (z.B. `neueseite.html`)

2. **Seite in der Navigation registrieren**: 
   - Öffne die Datei `js/navigation.js`
   - Füge deine neue Seite zum `pages`-Array hinzu:
   ```javascript
   const pages = [
       { name: "Startseite", url: "index.html" },
       { name: "Kinderlieder-Videos", url: "kinderlieder.html" },
       { name: "Sternenfotos", url: "sternenfotos.html" },
       { name: "DEIN SEITENNAME", url: "deine-seite.html" }  // <-- Hier einfügen
   ];
   ```

3. **Inhalt anpassen**: Bearbeite deine neue HTML-Datei und füge deinen Inhalt ein

4. **Styling anpassen**: Füge bei Bedarf seiten-spezifische Styles im `<style>`-Tag hinzu

## Bilder hochladen - Wichtige Hinweise

### EXIF-Metadaten entfernen

**WARUM?** Bilder von Handys und Kameras enthalten Metadaten (EXIF-Daten), die sensible Informationen preisgeben können:

- 📍 **GPS-Koordinaten** - Zeigt den genauen Aufnahmeort (auch wenn du denkst, sie wären deaktiviert!)
- 📱 **Geräte-Informationen** - Kameramodell, Seriennummer, Software-Version
- 🕒 **Zeitstempel** - Datum und Uhrzeit der Aufnahme
- 🎨 **Bearbeitungsinformationen** - Welche Software zur Bearbeitung verwendet wurde
- 📐 **Orientierung & Einstellungen** - Belichtungszeit, Blende, ISO, etc.

### Empfohlene Tools zum Entfernen von Metadaten

#### Online-Tools (einfachste Methode):
- [exif.tools](https://exif.tools/) - Einfach Bild hochladen, Metadaten anzeigen und entfernen
- [EXIF Viewer Online](https://exif-viewer.com/) - Metadaten anzeigen
- [Verexif](https://www.verexif.com/en/) - Metadaten entfernen

#### Desktop-Software:
- **Windows**: ExifTool (kostenlos, mächtig)
- **Mac**: ExifTool oder "Vorschau" App (Rechtsklick → Informationen → EXIF-Daten entfernen)
- **Linux**: ExifTool (über Paketmanager installierbar)

#### Mobile Apps:
- **Android**: "Photo Exif Editor" oder "EXIF Eraser"
- **iOS**: "Exif Metadata" oder "Metapho"

### Was du tun solltest:

1. **Vor dem Hochladen**: Immer alle Metadaten entfernen!
2. **Ausnahme Zeitstempel**: Kann bleiben, wenn er für die Dokumentation wichtig ist (z.B. bei astronomischen Aufnahmen)
3. **Dateinamen**: Verwende generische Namen wie `sternenhimmel-01.jpg` statt `mein-haus-berlin-2024.jpg`

### Beispiel-Workflow:

```
1. Bild mit dem Handy machen
2. Bild auf den Computer übertragen
3. Mit exif.tools Metadaten prüfen und entfernen
4. Bild mit generischem Namen speichern
5. Auf die Website hochladen
```

## Struktur der Website

```
restoffel.github.io/
├── index.html          # Startseite
├── kinderlieder.html   # Kinderlieder-Videos
├── sternenfotos.html   # Sternenfotos
├── TEMPLATE.html       # Vorlage für neue Seiten
├── ANLEITUNG.md        # Diese Anleitung
├── css/
│   └── styles.css      # Standard-Styles für alle Seiten
└── js/
    └── navigation.js   # Navigation für alle Seiten
```

## Responsive Design

Die Website ist automatisch für Mobile und Desktop optimiert:
- Auf Mobilgeräten: Hamburger-Menü (drei Striche) öffnet die Seitenleiste
- Auf Desktop: Seitenleiste ist immer sichtbar

## Farben & Design

- **Hauptfarbe**: #4da6ff (Helles Blau)
- **Hintergrund**: Dunkles Blau-Gradient (#0f0f23 bis #1a1a3e)
- **Text**: Weiß (#fff)
- **Akzente**: Cyan/Blau-Töne

Falls du Fragen hast oder Hilfe brauchst, frag einfach!
