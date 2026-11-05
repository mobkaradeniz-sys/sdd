# Mobil Araç Servisi — canlı sisteme geçiş paketi

Bu paket, müşteri mobil uygulaması + API sunucusu + yönetici paneli başlangıç kodudur.

## Bu sürüm neleri yapar?
- Müşteri hesabı oluşturma ve giriş (telefon + parola)
- Servis talebi oluşturma; arıza kategorisi, araç, adres ve talep anındaki GPS koordinatı
- Yönetici girişi; talepleri listeleme, haritada açma, durum güncelleme
- 30 TL/km baz tarife üzerinden yönetici tarafından mesafe ve ücret girme
- Telefonla işletmeyi arama: 0531 309 27 67
- Yol yardım hizmeti verilmediği bilgisi müşteri ekranında

## Önemli: Bu paket henüz mağazaya yayımlanmış veya internette barındırılan canlı hizmet değildir.
Gerçek müşteriye açılmadan önce aşağıdakiler zorunludur:
1. Sunucuyu HTTPS destekleyen bir hosting/VPS ortamına kurmak.
2. PostgreSQL veritabanı oluşturup `server/.env` dosyasını doldurmak.
3. Güçlü yönetici parolası, JWT_SECRET ve CORS_ALLOWED_ORIGIN tanımlamak.
4. KVKK aydınlatma metni, gizlilik/çerez metinleri ve veri saklama-imha süreçlerini hukukçu/mali müşavirle onaylamak.
5. e-Fatura/e-Arşiv için GİB uyumlu özel entegratör hesabı ve sözleşmesi bağlamak. Bu pakette gerçek fatura kesilmez; vergi/fatura modülü entegratör olmadan etkinleştirilmemelidir.
6. Android Google Play ve Apple App Store geliştirici hesaplarıyla imzalı mağaza sürümlerini üretmek ve incelemeye göndermek.

## 1) API sunucusu
Node.js 20+ ve PostgreSQL gerekir.

```bash
cd server
cp .env.example .env
# .env içindeki DATABASE_URL, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD_HASH, CORS_ALLOWED_ORIGIN alanlarını doldurun.
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

İlk admin hesabı için parolayı hash'leyin:
```bash
node -e "require('bcryptjs').hash('BURAYA_GUCLU_PAROLA',12).then(console.log)"
```
Çıktıyı `ADMIN_PASSWORD_HASH` alanına yazın. İlk kurulumda migration oluşturmak için `npx prisma migrate dev --name init` kullanın.

## 2) Yönetici paneli
`admin/index.html` dosyasını web hosting'e koyun. Ekrandaki API adresine sunucu URL'sini yazın. Yönetici e-postası ve parolası ile giriş yapın. Talepleri görüntüleyip durumlarını güncelleyebilirsiniz. Harita bağlantısı Google Maps'te koordinatı açar.

## 3) Mobil uygulama
`mobile` klasöründeki Expo projesini açın:
```bash
npm install
npx expo start
```
`mobile/app.json` içindeki paket adını mağaza hesabınıza uygun, benzersiz bir kimlikle değiştirin. `App.js` içindeki `API_URL` değerini HTTPS sunucu adresiniz yapın. Android/iOS testleri gerçek cihazlarda yapılmalıdır.

## Ücret ve iptal politikası
30 TL/km kullanıcının belirttiği tarife taslağıdır. Tek yön mü, gidiş-dönüş mü, başlangıç/çıkış bedeli veya asgari ücret var mı işletme tarafından netleştirilmeden otomatik kesin ücret gösterilmemelidir. Yönetici panelindeki tutar manuel onaylanır. Ekip yola çıktıktan sonraki iptal bedeli, tutarı ve koşulları çağrı öncesinde müşteriye açıkça gösterilmeli ve tüketici mevzuatına uygun olmalıdır.

## Kişisel veri güvenliği
T.C. kimlik numarası alanı özellikle eklenmemiştir. Gerekliliği ve hukuki dayanağı doğrulanmadan toplanmamalıdır. GPS yalnızca kullanıcı servis talebi oluştururken izin verirse alınır; arka planda takip yoktur. Üretim öncesi KVKK aydınlatması, veri minimizasyonu, saklama süresi, erişim logları, yedekleme, şifreleme ve ihlal prosedürü hazırlanmalıdır.

## Destek telefonu
0 (531) 309 27 67
