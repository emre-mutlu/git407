# GİT407 · Hareketli Grafik Tasarımı
## Graph Editor ile Tasarlanmış Hareket · Speed & Value Graph

Ödev brief'i · Son teslim 20 Temmuz 2026, Pazartesi

### 1. Ödevin Tanımı ve Amacı

**Görev.** Tek bir objenin ya da öğenin hareket ettiği kısa bir animasyon hazırlayacaksınız. Bu ödevin konusu doğrudan hareketin niteliği: objenin belirli noktalarda anlamlıca hızlanması, yavaşlaması, bir an durması. Hareketin "olmuş bitmiş" değil, tasarlanmış görünmesi gerekiyor.

**Amaç.** Derste işlediğimiz speed graph ve value graph mantığını bilinçli kullanmak. Value graph bir özelliğin (konum, rotasyon, ölçek) zaman içindeki değerini; speed graph ise o değişimin hızını gösterir. İster speed graph'la çalışın, ister value graph'la, ister ikisini birden kullanın, fark etmez. Önemli olan harekete ağırlık, momentum ve niyet hissi katabilmeniz.

**Konsept.** Konu tamamen size ait. Derste üzerine çalıştığımız havada süzülen kağıt uçak animasyonunu yapabilir ya da kendi fikrinizle gelebilirsiniz. Aşağıdaki listedeki örnekler yalnızca fikir vermek için; sizi bağlamaz, kendi objenizi ya da sahnenizi seçmekte özgürsünüz. Önemli olan hareketin anlamsız bir titreşim değil, bir şey gibi görünen bir hareket olması ve iyi bir kompozisyonda yaşaması.

**2B mi 3B mi?** İkisi de kabul. Ama mümkünse 3B çalışmak tavsiye edilir: 3B alanda çalışmak kamera, derinlik ve daha fazla eksende hareket kontrolü kazandırır, yani daha çok şey öğrenirsiniz. Zorunlu değil; iyi kurulmuş 2B bir hareket, kötü kurulmuş bir 3B'den her zaman daha değerlidir.

### 2. İstenenler

**Anlamlı timing.** Hareket doğrusal ve mekanik olmamalı. Nerede hızlanacağı, nerede yavaşlayacağı, nerede bir an duracağı bilinçli bir karar olsun. Sabit hızlı, otomatik görünen hareket puan kaybettirir.

**Graph editor.** Hareketi speed graph, value graph ya da ikisini birden kullanarak inceltebilirsiniz, hangisiyle rahatsanız. Value graph değerin nereye gittiğini (ease-in/out, overshoot, yumuşak yerleşme), speed graph ise hangi hızla gittiğini (ivmelenme, momentum, sönümlenme) kontrol etmeye yarar. Yeter ki hareketi bilinçle şekillendirin.

**İyi kompozisyon.** Hareket iyi görünen bir sahnede yaşamalı. Kadraj, denge, boşluk kullanımı, renk ve genel tasarım dili önemli. Konseptiniz de bu kompozisyonun bir parçası: sahne bir şey anlatmalı, estetik açıdan derli toplu durmalı.

**Süre.** 4 ile 10 saniye arası. Tek bir hareketin niteliğine odaklanın; uzun tutmak yerine kısa ve iyi kurgulanmış bir hareket hedefleyin.

### 3. Ne yapabilirsiniz? (yalnızca fikir)

Aşağıdakiler sadece ilham vermek için. Bunlardan birini seçmek zorunda değilsiniz; kendi objenizle, sahnenizle gelebilirsiniz.

**Kağıt uçak süzülüşü.** Derste üzerine çalıştığımız örnek. Havada asılı kalma, hafif alçalma, bir hava akımıyla yükselme; süzülmenin akıcı ritmi.

**Sıcak hava balonu yükselişi.** Ağır ve yavaş bir ivmeyle yukarı, hafif salınımla. Objenin ağırlığını timing ile hissettirmek.

**Düşen / süzülen yaprak.** Sağa sola salınarak, hafifçe dönerek inen bir yaprak. Value graph'ta güzel, yumuşak eğriler.

**Drone kalkışı.** Yerde hafif bir titreme, ardından ani bir yükseliş, sonra havada asılı kalma (hover).

**Sarkaç / salıncak.** Uçlarda yavaşlayıp ortada hızlanan salınım; ease-in/out ve momentumun en saf hali.

**Uzayda süzülen obje.** Sıfır yerçekiminde yavaşça dönen, sürüklenen bir obje ya da astronot.

### 4. İpuçları

**Önce kafanızda canlandırın.** Yapacağınız hareketi zihninizde oynatın: ne kadar sürede gerçekleşmeli, nerede hızlanıyor, nerede yavaşlıyor, nerede bir an duruyor? Ritmini ve saniyesini hissedin. İsterseniz kendiniz kısa bir referans video çekin ya da elinize bir obje alıp (bir kağıt, bir kalem) o hareketi gerçekten yapın; oradaki süreyi ve hızı gözleyip taklit edin.

**Neden.** Animasyonda inandırıcı hareket icat edilmez, gözlemlenir. Graph editor'deki eğriler aslında gerçek dünyadaki hız değişiminin bir kaydıdır; bir objenin ağırlığı ve momentumu tam da bu zamanlamada okunur. Önce gerçeği anlarsanız, keyframe'ler ve graph editor sadece o hareketi geri kurmanın aracı olur.

Birkaç pratik ipucu:

- Value graph *nereye*, speed graph *ne hızla* sorusunu ayrı ayrı sorun. Hangisiyle çalışırsanız çalışın, ne yaptığınızı bilerek çalışın.
- Önce kaba **blocking** yapın (ana pozları ve kabaca zamanlamayı koyun), sonra graph editor'de inceltin. Hareketi baştan mükemmel kurmaya çalışmayın.
- Hızlı anlarda **motion blur** açın; ani hareketler inandırıcı olur.

### 5. Teknik Gereksinimler ve Teslimat

- **Araç.** After Effects tavsiye edilir (graph editor bu ödevin merkezinde). İsterseniz easing/graph kontrolünü kurabildiğiniz başka bir araçla da (ör. Blender, Cinema 4D) çalışabilirsiniz.
- **Çözünürlük.** 1920×1080 (Full HD)
- **Kare hızı.** 24 ya da 30 fps
- **Süre.** 4-10 saniye
- **Ses.** İsteğe bağlı. Kullanırsanız telifsiz olsun.
- **Çıktı formatı.** H.264 kodlu MP4
- **Teslim yeri.** Render alınmış MP4 dosyasını UZAK üzerinden yükleyin.
- **Kaynak dosya.** Proje dosyanızı (`.aep` ya da kullandığınız aracın proje dosyası) asset'leriyle birlikte kendinizde saklayın. İstenirse graph editor ve keyframe kurulumunu gösterebilmelisiniz.

### 6. Dikkat Edilecekler

- Doğrusal (sabit hızlı) ve sıçramalı hareket bu ödevin en büyük puan kaybı. Graph editor'ü es geçmeyin.
- Easing'i son anda "biraz oynasın" diye eklemeyin. Timing, işin baştan planlanan merkezi olmalı.
- Anlamsız, "sadece kımıldayan" bir hareketten kaçının; hareket bir şeyi anlatmalı, bir niyet taşımalı.
- Kompozisyonu ihmal etmeyin. İyi bir hareket, dağınık bir sahnede boşa gider.

### 7. Yardımcı Kaynaklar

Aşağıdaki videolar İngilizce ama görsel olarak takip edilebilir. Başlamadan önce izlemeniz işi hızlandırır.

**Graph editor (speed & value graph)**
- [The LAST Graph Editor Tutorial You'll Ever Need](https://www.youtube.com/watch?v=7pOCtlrrE3Y)
- [Keyframes, Easy Ease & Graph Editor Explained](https://www.youtube.com/watch?v=WyU30vgN104)

**Easing ve timing**
- [After Effects Easing… like a pro](https://www.youtube.com/watch?v=HpVtzOtaHlg)
- [Easing in After Effects (Beginners)](https://www.youtube.com/watch?v=RPgFuyTOp5Q)

**3B'de hareket (opsiyonel)**
- [Camera and 3D Layers: After Effects for Beginners](https://www.youtube.com/watch?v=WgtLCehQUJ8)

### 8. Değerlendirme

| Ölçüt | Ağırlık |
|---|---|
| Hareket kalitesi (speed/value graph · easing · timing) | %50 |
| Kompozisyon ve tasarım (kadraj · renk · konsept · estetik) | %35 |
| Teknik teslim ve temizlik | %15 |

### 9. Son Teslim

**20 Temmuz 2026, Pazartesi.** Teslim UZAK üzerinden yapılır.

---

*Kaynak: bu brief GİT407 4. hafta (canlılık · timing · graph editor) içeriğine dayanarak hazırlandı. Yapıştırmaya hazır sürüm: `git407-odev-hareket-speed-value-graph.html` (inline-stil, Moodle/UZAK için).*
