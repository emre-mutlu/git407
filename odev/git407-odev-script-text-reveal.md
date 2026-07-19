# GİT407 · Hareketli Tipografi
## El Yazısı Write-On · Script Text Reveal

Ödev brief'i · Son teslim 27 Temmuz 2026, Pazartesi

### 1. Ödevin Tanımı ve Amacı

**Görev.** Kısa bir metnin (bir isim, bir kelime, kısa bir söz ya da bir logotype) sanki elle, kalemle o an yazılıyormuş gibi ekranda ortaya çıktığı kısa bir animasyon hazırlayacaksınız.

**Amaç.** Write-on tekniğini üç aracı birlikte kullanarak kurmak: **trim paths** kalem yolunu zamanla çizdirir, **alpha matte** bu çizilen stroke'u alttaki dolgulu yazıyı açığa çıkaran maskeye dönüştürür, **mask** ise bitişik/kesişen harf bölgelerini denetler. Yazı, siz o kelimeyi elle yazarken nasıl akıyorsa öyle akmalı, mekanik bir "belirme" değil.

**Format serbest.** Bir başlık kartı, sosyal medya içeriği (post / story), marka logo animasyonu, intro ya da tebrik kartı olabilir. Bağlamı siz kurarsınız; yeter ki metin write-on ile ortaya çıksın.

### 2. İstenenler

**Write-on · üç teknik.** Metin, kontur boyunca elle yazılıyormuş gibi ortaya çıkmalı ve bunu **trim paths + alpha matte + mask** üçlüsünü birlikte kullanarak kuracaksınız. Tek bir maske ile soldan sağa "silme/açma" bu ödevin özünü kaçırır.

**Gerçek yazım sırası.** Reveal, bir elin o kelimeyi yazarken izlediği sırayı ve yönü takip etmeli (kalem kaldırışları dahil). Trim paths üstünden geçerken **henüz yazılmamış harf parçaları erkenden görünmemeli** (nasıl önleneceği 4. bölümde).

**Kompozisyon.** Seçtiğiniz format iyi bir kadrajda yaşamalı: boşluk, denge, renk ve tipografi seçimi değerlendirmeye girer.

**İkincil vurgu (opsiyonel bonus).** Write-on bitince küçük bir ikincil hareket (altçizgi, beliren tagline, ufak süsleme) ekleyebilirsiniz. Zorunlu değil, ama iyi zamanlanmışsa işi öteye taşır.

**Süre.** 3-8 saniye. Tek bir reveal'in niteliğine odaklanın.

### 3. Ne yapabilirsiniz? (yalnızca fikir)

Aşağıdakiler sadece ilham vermek için. Bunlardan birini seçmek zorunda değilsiniz; kendi metninizle, kendi bağlamınızla gelebilirsiniz.

- **Kendi imzanız / adınız** — el yazısıyla akan bir isim, kişisel bir intro ya da kapanış kartı.
- **Marka logotype'ı** — gerçek ya da uydurma bir markanın el yazısı logosu, kalemle çizilip yerine oturuyor.
- **Kısa bir söz / alıntı** — sevdiğiniz bir cümle, story formatında dikey bir kompozisyonda.
- **Kafe / dükkan tabelası** — "Fresh Coffee" gibi bitişik bir yazının bir sahnede belirmesi.
- **Tebrik kartı** — "Mutlu Yıllar", "Happy Birthday" gibi bir ibarenin elle yazılışı, küçük bir süslemeyle.

### 4. İpuçları

**Önce gerçek el yazısını gözleyin.** Bir kalem alıp seçtiğiniz kelimeyi birkaç kez yavaşça yazın ya da kendinizi çekin: elin hangi sırayla ve hangi yönde gittiğini izleyip animasyonda aynısını taklit edin.

- **Font.** Bitişik (script) bir yazı tipi seçin; ayrık fontlar tek sürekli çizgi hissini bozar.
- **Kurulum.** Dolgulu asıl yazıyı bir katmana koyun; üstüne harflerin merkez çizgisini izleyen bir **stroke path** çizin (Pen aracı), buna **trim paths** ekleyip "end"i 0'dan 100'e animasyonlayın ve stroke'u asıl yazıya **alpha matte** yapın.
- **Taşmayı önleyin (en kritik).** Tek kalın bir stroke tüm kelimeyi çizmesin; yazıyı **yazım sırasına göre parçalara bölün** (her kalem-inişi ayrı parça) ve kesişen yerlerde matte'nin komşuya taşmasını **mask / ayrı matte** ile engelleyin. Stroke'u yalnızca kendi harfini örtecek kalınlıkta tutun.

### 5. Teknik Gereksinimler ve Teslimat

- **Araç.** After Effects tavsiye edilir; benzer kontrolü kurabildiğiniz başka bir araçla da çalışabilirsiniz.
- **Format ve çözünürlük.** Seçtiğiniz formata uygun olsun: yatay 1920×1080, kare 1080×1080 ya da dikey 1080×1920.
- **Kare hızı.** 24 ya da 30 fps · **Süre.** 3-8 saniye
- **Ses.** İsteğe bağlı; kullanırsanız telifsiz olsun.
- **Çıktı.** H.264 kodlu MP4, UZAK üzerinden yüklenir.
- **Kaynak dosya.** Proje dosyanızı (`.aep` ya da kullandığınız aracınki) asset'leriyle saklayın; istenirse stroke path, trim paths, alpha matte ve mask kurulumunu gösterebilmelisiniz.

### 6. Dikkat Edilecekler

- Trim paths üstünden geçerken henüz yazılmamış parçaların erken görünmesi bu ödevin bir numaralı tuzağı; parçalara bölüp mask'la sınırlayın.
- Tek maske ile soldan sağa "silinerek belirme": yazı kendi çizim sırasını takip etmeli.
- Okunmayan ya da çözünürlüğe göre küçük kalan bir font seçmeyin.
- Dağınık bir kadraj iyi bir reveal'i boşa çıkarır.

### 7. Yardımcı Kaynaklar

Aşağıdaki kaynaklar İngilizce ama görsel olarak takip edilebilir.

**Write-on / el yazısı animasyonu (video)**
- [Handwriting Text Effect Animation Tutorial in After Effects | Write On Effect](https://www.youtube.com/watch?v=Z-adNJoI-Xw)
- [After Effects · Handwriting Text Reveal Animation | Tutorial](https://www.youtube.com/watch?v=78uhkYo5UOE)

**Trim paths ve teknik (yazılı rehber)**
- [How to Animate Handwritten Text in After Effects — Envato Tuts+](https://photography.tutsplus.com/tutorials/how-to-animate-handwritten-text-in-after-effects--cms-41293)
- [Create Handwriting Animations With After Effects CC — tutvid](https://tutvid.com/after-effects/handwriting-animation-effects-cc/)

### 8. Değerlendirme

| Ölçüt | Ağırlık |
|---|---|
| Reveal kalitesi (alpha matte · mask · trim paths · yazım sırası) | %50 |
| Kompozisyon ve format kararı (kadraj · renk · konsept · estetik) | %35 |
| Teknik teslim ve temizlik | %15 |

### 9. Son Teslim

**27 Temmuz 2026, Pazartesi.** Teslim UZAK üzerinden yapılır.

---

*Kaynak: bu brief GİT407 4. hafta (canlılık · timing · graph editor) içeriğine ve bir önceki hareket ödevine dayanarak hazırlandı. Yapıştırmaya hazır sürüm: `git407-odev-script-text-reveal.html` (inline-stil, Moodle/UZAK için).*
