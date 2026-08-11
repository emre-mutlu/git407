#!/usr/bin/env python3
"""Odev brief'inin markdown kaynagini UZAK'a yapistirilan HTML'e cevirir.

Kullanim:
    python3 bin/brief-html.py odev/git407-odev-seken-top.md

Ciktiyi ayni adla .html olarak yazar. Stil kaliplari elle yazilmis onceki
brief'lerden alindi (git407-odev-hareket-speed-value-graph.html); Moodle'in
editoru dis stil dosyasi kabul etmedigi icin her etiket kendi style'ini tasiyor.

Desteklenen markdown:
    # ust etiket        -> kirmizi kucuk baslik
    ## baslik           -> h1
    ilk duz satir       -> alt bilgi (son teslim satiri)
    ### N. Baslik       -> h2, numara kirmizi
    **Kalin.** metin    -> paragraf, basi kalin
    - madde             -> listesiz ul/li
    `kod`               -> kod etiketi
"""
import html
import os
import re
import sys

SARMAL = ("max-width:800px; margin:0 auto; font-family:'Hanken Grotesk',system-ui,"
          "-apple-system,'Segoe UI',Roboto,sans-serif; color:#2a2a32; line-height:1.7; "
          "font-size:17px;")
USTETIKET = ("font-family:'Martian Mono',ui-monospace,'SF Mono',Menlo,Consolas,monospace; "
             "font-size:13px; letter-spacing:2px; text-transform:uppercase; color:#e11d5a; "
             "margin-bottom:14px;")
H1 = ("font-family:'Archivo','Hanken Grotesk',system-ui,-apple-system,'Segoe UI',sans-serif; "
      "margin:0; font-size:36px; line-height:1.12; font-weight:800; letter-spacing:-0.02em; "
      "color:#14141a;")
ALTBILGI = "font-size:16px; color:#6b6b76; margin-top:14px;"
H2 = ("font-family:'Archivo','Hanken Grotesk',system-ui,sans-serif; font-size:23px; "
      "font-weight:800; color:#14141a; margin:38px 0 16px 0; letter-spacing:-0.01em;")
P = "margin:0 0 14px 0;"
UL = "margin:0; padding:0; list-style:none;"
LI = "margin-bottom:13px;"
STRONG = "color:#14141a;"
KOD = ("font-family:'Martian Mono',ui-monospace,Menlo,monospace; background:#eef7fb; "
       "color:#0b6b82; padding:1px 6px; border-radius:4px; font-size:14px;")
BAG = "color:#c01a54; text-decoration:underline;"
TABLO = "width:100%; border-collapse:collapse; font-size:17px;"
HUCRE = "padding:14px 4px; {cizgi}color:#14141a;"
AGIRLIK = ("padding:14px 4px; {cizgi}text-align:right; font-weight:800; color:#e11d5a; "
           "font-size:19px;")
CIZGI = "border-bottom:1px solid #e6e6ec; "


def satir_ici(m):
    """Kalin, kod, baglanti ve x isaretini HTML'e cevirir. Once kacis yapilir."""
    m = html.escape(m, quote=False)
    m = re.sub(r"`([^`]+)`", rf'<code style="{KOD}">\1</code>', m)
    m = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)",
               rf'<a href="\2" target="_blank" rel="noopener noreferrer" style="{BAG}">\1</a>', m)
    m = re.sub(r"\*\*([^*]+)\*\*", rf'<strong style="{STRONG}">\1</strong>', m)
    return m.replace("×", "&times;")


def cevir(kaynak):
    satirlar = kaynak.split("\n")
    parca, liste, tablo, altbilgi_yazildi = [], [], [], False
    ust = baslik = None

    def listeyi_kapat():
        if liste:
            ogeler = "".join(f'\n    <li style="{LI}">{o}</li>' for o in liste)
            parca.append(f'<ul style="{UL}">{ogeler}\n  </ul>')
            liste.clear()

    def tabloyu_kapat():
        """Olcut/agirlik tablosu: son satirda alt cizgi yok."""
        if not tablo:
            return
        satir_html = []
        for n, (sol, sag) in enumerate(tablo):
            c = "" if n == len(tablo) - 1 else CIZGI
            satir_html.append(
                f'      <tr>\n'
                f'        <td style="{HUCRE.format(cizgi=c)}">{sol}</td>\n'
                f'        <td style="{AGIRLIK.format(cizgi=c)}">{sag}</td>\n'
                f'      </tr>')
        parca.append(f'  <table style="{TABLO}">\n    <tbody>\n'
                     + "\n".join(satir_html) + "\n    </tbody>\n  </table>")
        tablo.clear()

    for ham in satirlar:
        s = ham.rstrip()
        if not s.strip():
            listeyi_kapat()
            tabloyu_kapat()
            continue
        if s.startswith("|"):
            hucreler = [h.strip() for h in s.strip("|").split("|")]
            if all(set(h) <= set("-: ") for h in hucreler):
                continue                      # ayirici satir
            if len(hucreler) == 2 and tablo == [] and hucreler[1].lower() in ("ağırlık", "agirlik"):
                continue                      # baslik satiri, tabloda gosterilmiyor
            if len(hucreler) == 2:
                tablo.append((satir_ici(hucreler[0]), satir_ici(hucreler[1])))
            continue
        if s.startswith("# "):
            ust = satir_ici(s[2:])
        elif s.startswith("## "):
            baslik = satir_ici(s[3:])
        elif s.startswith("### "):
            listeyi_kapat()
            tabloyu_kapat()
            govde = satir_ici(s[4:])
            m = re.match(r"^(\d+)\.\s+(.*)$", s[4:])
            if m:
                govde = f'<span style="color:#e11d5a;">{m.group(1)}.</span> {satir_ici(m.group(2))}'
            parca.append(f'\n  <h2 style="{H2}">{govde}</h2>')
        elif s.startswith("- "):
            liste.append(satir_ici(s[2:]))
        else:
            listeyi_kapat()
            tabloyu_kapat()
            if not altbilgi_yazildi and ust and baslik:
                parca.append(f'<div style="{ALTBILGI}">{satir_ici(s)}</div>')
                altbilgi_yazildi = True
            else:
                parca.append(f'  <p style="{P}">{satir_ici(s)}</p>')
    listeyi_kapat()
    tabloyu_kapat()

    bas = [f'<div id="odev" style="{SARMAL}">', "",
           f'  <div style="{USTETIKET}">{ust}</div>',
           f'  <h1 style="{H1}">{baslik}</h1>']
    return "\n".join(bas + parca + ["", "</div>"]) + "\n"


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return 1
    for yol in sys.argv[1:]:
        with open(yol, encoding="utf-8") as f:
            cikti = cevir(f.read())
        hedef = os.path.splitext(yol)[0] + ".html"
        with open(hedef, "w", encoding="utf-8") as f:
            f.write(cikti)
        print(f"{hedef}  ({len(cikti)} karakter)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
