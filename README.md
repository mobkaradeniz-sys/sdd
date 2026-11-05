# Mobil Araç Servisi — Expo uygulama başlangıç projesi

Bu proje Android ve iOS için geliştirilebilir bir React Native / Expo uygulama prototipidir.

## İçerik
- Türkçe müşteri ana ekranı
- Servis çağırma formu
- Motor, turbo, arıza tespit, elektrik, yağ/filtre bakımı ve diğer mekanik arıza kategorileri
- Telefonla arama
- Kullanıcının açık izniyle tek seferlik konum alma (arka planda takip yapmaz)
- 30 TL/km örnek yol bedeli hesaplama
- Talep iptal akışı için demo arayüzü

## Bilinen sınırlar — canlı işletme için gereklidir
Bu kaynak kod tek başına canlı servis işletim sistemi değildir. Müşteri taleplerinin işletme ekibine ulaşması, yöneticinin haritada konumları görmesi, durum güncellemeleri, ekip atama, gerçek iptal/çıkış bedeli, KDV ve e-Fatura/e-Arşiv entegrasyonu için güvenli bir sunucu, veritabanı ve yetkili entegrasyonlar kurulmalıdır. Bu prototipte form gönderimi cihazda örnek uyarı gösterir; sunucuya veri göndermez.

T.C. Kimlik No hassas kişisel veridir. Fatura için her işlemde gerekli olmayabilir. Hukuki dayanak ve gereklilik doğrulanmadan toplanmamalı; mümkünse alan kaldırılmalı. Canlı sistemde KVKK aydınlatma metni, açık rıza gereken hallerde ayrı rıza, saklama/imha politikası, şifreleme, erişim kayıtları ve rol bazlı yetki uygulanmalıdır. Konum yalnızca müşteri talebi sırasında ve bilgilendirilerek alınmalıdır.

## Geliştirme ortamı
1. Bilgisayara Node.js LTS kurun.
2. ZIP'i açın ve proje klasöründe terminal/CMD açın.
3. `npm install` çalıştırın.
4. `npx expo start` çalıştırın.
5. Android telefona Expo Go kurup terminaldeki QR kodu okutun. iPhone'da da Expo Go ile önizleme yapılabilir.

## Mağazalara hazırlama
Mağazaya yüklenebilir Android AAB ve iOS IPA üretmek için Expo/EAS Build yapılandırması, geliştirici hesapları, uygulama imzalama, gizlilik beyanları, mağaza ekran görüntüleri ve inceleme süreci gerekir. iOS dağıtımı için Apple Developer hesabı gerekir. Bu ZIP doğrudan mağazadan indirilebilir bir APK/IPA değildir.

## Canlı sürüm için önerilen mimari
- Mobil uygulama: Expo / React Native
- API: Node.js + Express veya NestJS
- Veritabanı: PostgreSQL
- Harita: Google Maps veya Mapbox; müşteri konumu sadece servis talebi kapsamında
- Yönetim paneli: web tabanlı, rol bazlı erişim
- Bildirim: Expo Push Notifications
- Fatura: Türkiye'de yetkili özel entegratör üzerinden e-Fatura/e-Arşiv; mali müşavir ve entegratör onayı
- Ödeme/ücret: kilometre tarifesi, çıkış/iptal koşulları ve KDV müşteriye talep onayından önce açıkça gösterilmeli

Telefon: 0 (531) 309 27 67
Tarife taslağı: 30 TL/km (kesin ücret ve tek yön/gidiş-dönüş hesabı işletme politikasında netleştirilmelidir).
