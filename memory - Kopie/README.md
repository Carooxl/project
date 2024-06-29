## Astronomie Memory

API: "https://api.le-systeme-solaire.net"

herausgezogene Werte: 
Bodies Planeten, Asteroiden und Monde
mit den Kategorien id,englishName,semimajorAxis,meanRadius,gravity,sideralOrbit,bodyType,density


### Idee
ein Memory Spiel zu Astronomie


**Tabellenansicht**

Alle Bodies werden mit ihren Werten in einer Tabelle angezeigt.
Es ist möglich die Tabelle nach dem Namen, dem bodyType, semimajorAxis, meanRadius, gravity, sideralOrbit und density zu sortieren.
Bei einem Klick auf den Karten Auswahl Button werden 12 Bodies zufällig ausgewählt und diese hervorgehoben und in der Tabelle nach oben geschoben.
Die Werte werden gespeichert, dass sie weiter verwendet werden können.
Durch den Auswahl aufheben Button wird die Sortierung der Werte aufgehoben und die ausgewählten Bodies wieder nach oben geschoben.

*Mobile Ansicht* 
Hier werden in der Tabelle nur noch der Name und der bodyType angezeigt.
Der Rest bleibt bestehen


**Kartenübersicht**

DIe ausgewählten Bodies werden in eienm 3x4 Raster als Karten angezeigt.
Beim ersten Anzeigen der Karten wird nur der Name und der bodyType auf der Karte angezeigt.
Es ist möglich die Bodies einzel zu sortieren nach den Kategorien: semimajorAxis, meanRadius, gravity, sideralOrbit und density.
Bei Klick auf einen dieser Buttons wird auf der Karte dann zusätzlich dieser Wert angezeigt und die Karten werden entsprechend des Wertes aufsteigend angezeigt.
Durch den Auswahl aufheben Button werden die Kategorien auf den Karten nicht mehr angezeigt.

Die Karten sind hoverbar.

*Mobile Ansicht* 
Buttons bekommen eine andere Anordung.
Karten stehen in einem anderen Grid.


**Spiel**

Ausgewählte Karten sind zu Beginn nur mit der Rückseite sichtbar.
Es wird eine Kategorie vorgegeben, für diese ein Pärchen gefunden werden soll.
Ist ein Pärchen gefunden, wird der Pärchencounter um 1 nach oben gesetzt.
Ist es ein richtiges Pärchen verschwinden die Karten. Bei einem falschen Pärchen werden die Karten automatisch wieder herumgedreht.
Danach wird für den nächsten Zug eine neue Kategorie angezeigt.
Die Züge, bis alle Pärchen gefungen wurden, werden im Zugcounter angezeigt.

***Pärchen***
Es ist ein Pärchen wenn der Wert der beiden Karten am ähnlichsten ist. Die Differenz der beiden Karten am geringsten ist, in Bezug auf die übrigen Karten.

*Mobile Ansicht*
Karten stehen in einem anderen Grid.

### Bildquellen
Backbild, Bilder Monde und Asteroiden - Microsoft Copilot
Planetenbilder - aus der Planetenwebsite


