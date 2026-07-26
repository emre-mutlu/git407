# GİT407 · Hareketli Grafik Tasarımı
## Animasyon İlkeleriyle Canlı Hareket

Ödev brief'i · Son teslim 17 Ağustos 2026, Pazartesi · saat 10.00

### 1. Ödevin Tanımı ve Amacı

**Görev.** Animasyon ilkelerini kullandığınız kısa bir hareketli grafik tasarımı hazırlayacaksınız. Konuyu siz seçeceksiniz: bir obje, bir logo, bir arayüz öğesi, bir karakter ya da soyut bir şekil olabilir. Değerlendirilen şey neyin hareket ettiği değil, nasıl hareket ettiği.

**Amaç.** Bir hareketin sadece çalışması ile canlı görünmesi arasında fark vardır. Bu farkı animasyon ilkeleri kurar: objenin ağırlığı, niyeti, esnekliği ve parçalarının birbirinden geç kalması. Bu ödevde ilkeleri ezberden değil, sahnenizin gerektirdiği yerde kullanmanız bekleniyor.

**Bir önceki ödevden farkı.** Speed & value graph ödevinde tek bir objenin hız eğrisini incelttiniz. Burada aynı özen devam ediyor, ama bu kez birden fazla ilke birlikte çalışacak. Tek bir iyi eğri artık yeterli değil.

### 2. İstenenler

**Zorunlu iki ilke.** Aşağıdaki ikisi her işte olmalı:

- **Timing.** Hareketin ne kadar sürdüğü. Aynı mesafeyi 6 karede mi 24 karede mi geçtiği, objenin ağır mı hafif mi olduğunu belirler. Süreyi bilerek seçin.
- **Spacing (slow-in / slow-out).** Kareler arasındaki mesafenin dağılımı. Gerçek nesneler sabit hızla başlayıp durmaz; hızlanır, yavaşlar ve yerine oturur. Graph editor'de kurulur.

**Seçmeli ilkeler — en az iki tanesi.** Aşağıdaki üçlüden **en az ikisini** işinizde açıkça görebilmeliyiz:

- **Anticipation (hazırlık).** Hareketten önce ters yöne yapılan küçük hazırlık. Zıplamadan önce çömelmek, sağa fırlamadan önce sola bir tık gitmek gibi. İzleyiciyi gelecek harekete hazırlar.
- **Squash & stretch (ezilme ve uzama).** Çarpışmada ezilme, hızlanmada uzama. Objeyi esnek ve canlı gösterir. Kural: **hacim korunur** — bir eksende ezilirken diğerinde genişler.
- **Overlapping action (üst üste binen hareket).** Objenin parçaları aynı anda durmaz. Kuyruk, kumaş, saç gibi uzantılar ana gövdeden geç kalkar ve geç durur. Keyframe'leri kaydırarak (offset) yapılır.

**Diğer ilkeler serbest.** Arcs, follow-through, secondary action, exaggeration, staging gibi ilkeleri de kullanabilirsiniz. Zorunlu değil; yerinde kullanılırsa değerlendirmeye olumlu yansır.

**İyi kompozisyon.** Hareket iyi bir sahnede olmalı. Kadraj, denge, boşluk, renk ve genel tasarım dili değerlendirmeye girer.

**Süre.** 4-10 saniye. Uzun bir iş yerine kısa ve iyi kurgulanmış bir hareket yapın.

### 3. İpuçları

**Önce ilkeleri izleyin.** 5. bölümdeki Alan Becker serisi her ilkeyi tek tek anlatıyor. Başlamadan önce izlemek işinizi kolaylaştırır ve ilkeleri doğru yerde kullanmanızı sağlar.

- **Önce blocking yapın.** Ana pozları ve kaba zamanlamayı koyun, hareket ayakta dursun. Squash, anticipation ve offset gibi ilkeleri sonra ekleyin.
- **Anticipation kısa tutulur.** Genelde 3-6 kare yeterlidir. Uzun tutarsanız hareket yavaş görünür.
- **Squash & stretch'te hacmi koruyun.** Scale'i tek eksende değiştirirseniz obje büyümüş ya da küçülmüş görünür. Bir eksen küçülürken diğeri büyümeli.
- **Overlapping, keyframe kaydırmakla yapılır.** Uzantının keyframe'lerini ana gövdeninkinden 2-5 kare geciktirin. Parça hafifledikçe gecikme artar.
- **Hızlı anlarda motion blur açın.** Ani hareketler daha inandırıcı olur.
- **Sahneyi kalabalıklaştırmayın.** Tek bir öğeyi iyi animasyonlamak, çok sayıda öğeyi ortalama animasyonlamaktan daha değerli.

### 4. Teknik Gereksinimler ve Teslimat

- **Araç.** After Effects tavsiye edilir. İsterseniz aynı kontrolü kurabildiğiniz başka bir araçla da (ör. Blender, Cinema 4D) çalışabilirsiniz.
- **Çözünürlük.** 1920×1080 (Full HD)
- **Kare hızı.** 24 ya da 30 fps · **Süre.** 4-10 saniye
- **Ses.** İsteğe bağlı. Kullanırsanız telifsiz olsun.
- **Çıktı formatı.** H.264 kodlu MP4
- **Teslim yeri.** Render alınmış MP4 dosyasını UZAK üzerinden yükleyin.
- **Kaynak dosya.** Proje dosyanızı (`.aep` ya da kullandığınız aracınki) asset'leriyle birlikte saklayın; istenirse keyframe ve graph editor kurulumunu gösterebilmelisiniz.

### 5. Dikkat Edilecekler

- Sabit hızlı hareket bu ödevin en büyük puan kaybı. Timing ve spacing zorunlu; graph editor'ü kullanın.
- İlkeleri sonradan eklenmiş gibi kullanmayın. Sahnenin gerektirmediği bir squash ya da sebepsiz bir anticipation işi zayıflatır.
- Squash & stretch'te hacmi bozmak sık yapılan bir hatadır; obje büyümüş ya da küçülmüş görünmemeli.
- Her şeyi aynı karede durdurmak hareketi mekanik gösterir; overlapping'i unutmayın.
- İlkeler hissedilmeli, ama işi karikatüre çevirmemeli (bilinçli bir üslup tercihi değilse).
- Kompozisyonu ihmal etmeyin. İyi bir hareket dağınık bir sahnede değerini kaybeder.

### 6. Yardımcı Kaynaklar

**Animasyonun temel ilkeleri (ana kaynak)**
- [12 Principles of Animation — Alan Becker](https://youtu.be/uDqjIdI4bF4) · Her ilkeyi tek tek, animasyonla anlatan seri. Bu ödevin çıkış noktası.

Aşağıdaki videolar İngilizce ama görsel olarak takip edilebilir.

**İlke bazında (Alan Becker serisi)**
- [Anticipation](https://youtu.be/F8OtE60T8yU)
- [Follow Through & Overlapping Action](https://youtu.be/4OxphYV8W3E)

**After Effects pratiği**
- [Squash & Stretch · After Effects (Motifize)](https://youtu.be/3RqoUMz3-8I)
- [Bouncing Ball · Graph Editor (Motion Made)](https://youtu.be/fKnwxQVedbs) · squash & stretch ve ağırlığı graph editor'de kurmanın adım adım örneği

**Timing ve spacing**
- [The LAST Graph Editor Tutorial You'll Ever Need](https://www.youtube.com/watch?v=7pOCtlrrE3Y)
- [After Effects Easing… like a pro](https://www.youtube.com/watch?v=HpVtzOtaHlg)

### 7. Değerlendirme

| Ölçüt | Ağırlık |
|---|---|
| İlkelerin uygulanışı (timing · spacing + seçilen en az iki ilke) | %50 |
| Kompozisyon ve konsept (kadraj · renk · tasarım · estetik) | %35 |
| Teknik teslim ve temizlik | %15 |

### 8. Son Teslim

**17 Ağustos 2026, Pazartesi · saat 10.00.** Teslim UZAK üzerinden yapılır.

---

*Kaynak: bu brief GİT407 4. hafta (ağırlık · canlılık · animasyon ilkeleri) içeriğine dayanarak hazırlandı. Yapıştırmaya hazır sürüm: `git407-odev-animasyon-ilkeleri.html` (inline-stil, Moodle/UZAK için).*
