import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, Alert, Linking, StyleSheet, Platform } from "react-native";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";

const CATEGORIES = ["Motor arızası", "Turbo arızası", "Arıza tespit", "Elektrik arızası", "Yağ bakımı", "Filtre bakımı", "Diğer mekanik arıza"];
const phone = "5313092767";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [tc, setTc] = useState("");
  const [contact, setContact] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [plate, setPlate] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [details, setDetails] = useState("");
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState(null);
  const [distance, setDistance] = useState("0");
  const [accepted, setAccepted] = useState(false);

  const locate = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return Alert.alert("Konum izni gerekli", "Konumunuzu paylaşmak için uygulama izni vermelisiniz.");
      const p = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setCoords({ latitude: p.coords.latitude, longitude: p.coords.longitude });
      Alert.alert("Konum alındı", "Konumunuz servis talebinize eklendi. Konum yalnızca talep sırasında paylaşılır.");
    } catch { Alert.alert("Konum alınamadı", "Adresinizi elle yazabilirsiniz."); }
  };

  const submit = () => {
    if (!name.trim() || !surname.trim() || !contact.trim() || !vehicle.trim() || !details.trim() || !accepted) {
      return Alert.alert("Eksik bilgi", "Ad, soyad, iletişim, araç, arıza açıklaması ve bilgilendirme onayı gereklidir.");
    }
    if (tc && !/^[0-9]{11}$/.test(tc)) return Alert.alert("T.C. Kimlik No", "T.C. Kimlik No 11 haneli olmalıdır.");
    if (!coords && !address.trim()) return Alert.alert("Konum gerekli", "Konum paylaşın veya açık adres girin.");
    Alert.alert("Demo talep oluşturuldu", "Bu prototipte talep cihaz üzerinde örnek olarak gösterilir. Canlı ekibe iletim için sunucu bağlantısı kurulmalıdır.");
    setScreen("home");
  };

  const call = () => Linking.openURL(`tel:${phone}`);
  const km = Math.max(0, Number(distance) || 0);
  const travel = km * 30;

  const Button = ({ title, onPress, secondary=false }) => (
    <TouchableOpacity onPress={onPress} style={[styles.button, secondary && styles.secondary]}>
      <Text style={[styles.buttonText, secondary && styles.secondaryText]}>{title}</Text>
    </TouchableOpacity>
  );
  const Field = ({ label, value, onChangeText, placeholder, keyboardType="default", multiline=false }) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder || label} keyboardType={keyboardType}
        multiline={multiline} style={[styles.input, multiline && {height:92, textAlignVertical:"top"}]} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.brand}>MOBİL ARAÇ SERVİSİ</Text>
          <Text style={styles.tagline}>Aracınızın bulunduğu yerde profesyonel bakım ve arıza onarımı</Text>
          <Text style={styles.phone}>☎ 0 (531) 309 27 67</Text>
        </View>

        {screen === "home" ? <>
          <Text style={styles.heading}>Nasıl yardımcı olalım?</Text>
          <Text style={styles.muted}>Yol yardım hizmeti verilmez. Mobil ekibimiz, uygun arıza ve bakım işlemleri için bulunduğunuz konuma gelir.</Text>
          <Button title="＋  SERVİS ÇAĞIR" onPress={() => setScreen("request")} />
          <Button title="☎  BİZİ ARA" onPress={call} secondary />
          <Text style={styles.sectionTitle}>Hizmetlerimiz</Text>
          <View style={styles.grid}>
            {CATEGORIES.map(x => <View key={x} style={styles.service}><Text style={styles.serviceText}>{x}</Text></View>)}
          </View>
          <View style={styles.notice}><Text style={styles.noticeTitle}>Ücret bilgilendirmesi</Text><Text style={styles.noticeText}>Gidiş mesafesi: 30 TL / km. Servis ekibi yola çıktıktan sonra müşteri iptal ederse, önceden bildirilen ve mevzuata uygun yol/çıkış masrafı talep edilebilir. Onarım, parça ve bakım ücretleri ayrıca teklif edilir.</Text></View>
          <Text style={styles.footer}>Konumunuz yalnızca servis talebiniz için, açık izninizle alınır.</Text>
        </> : <>
          <TouchableOpacity onPress={() => setScreen("home")}><Text style={styles.back}>‹ Ana sayfa</Text></TouchableOpacity>
          <Text style={styles.heading}>Servis talebi oluştur</Text>
          <Text style={styles.muted}>Zorunlu alanları doldurun. Talebiniz için gerekli malzeme ve ekipman hazırlığı yapılabilmesi adına arızayı ayrıntılı anlatın.</Text>
          <Text style={styles.sectionTitle}>Müşteri bilgileri</Text>
          <Field label="Ad" value={name} onChangeText={setName} />
          <Field label="Soyad" value={surname} onChangeText={setSurname} />
          <Field label="Telefon / iletişim" value={contact} onChangeText={setContact} keyboardType="phone-pad" />
          <Field label="T.C. Kimlik No (yalnızca hukuken gerekliyse)" value={tc} onChangeText={setTc} keyboardType="number-pad" />
          <Text style={styles.sectionTitle}>Araç ve arıza bilgileri</Text>
          <Field label="Araç marka / model / yıl" value={vehicle} onChangeText={setVehicle} />
          <Field label="Plaka (isteğe bağlı)" value={plate} onChangeText={setPlate} />
          <Text style={styles.label}>Arıza / bakım türü</Text>
          <View style={styles.chips}>{CATEGORIES.map(x => <TouchableOpacity key={x} onPress={() => setCategory(x)} style={[styles.chip, category===x && styles.chipOn]}><Text style={[styles.chipText, category===x && styles.chipTextOn]}>{x}</Text></TouchableOpacity>)}</View>
          <Field label="Arıza açıklaması ve belirtiler" value={details} onChangeText={setDetails} multiline />
          <Text style={styles.sectionTitle}>Servis konumu</Text>
          <Button title={coords ? "✓ Konum eklendi — yeniden al" : "⌖ MEVCUT KONUMUMU PAYLAŞ"} onPress={locate} secondary />
          <Field label="Açık adres (konum yerine de kullanılabilir)" value={address} onChangeText={setAddress} multiline />
          <Text style={styles.sectionTitle}>Tahmini yol bedeli</Text>
          <Field label="Tek yön mesafe (km) — örnek hesaplama" value={distance} onChangeText={setDistance} keyboardType="decimal-pad" />
          <Text style={styles.price}>{travel.toLocaleString("tr-TR")} TL <Text style={styles.muted}>({km} km × 30 TL/km)</Text></Text>
          <Text style={styles.small}>Bu alan tahmini hesap içindir. Kesin mesafe, gidiş güzergâhı ve ücret servis onayı öncesinde bildirilmelidir. Gidiş-dönüş veya asgari servis bedeli uygulanacaksa ayrıca açıkça belirtilmelidir.</Text>
          <TouchableOpacity style={styles.consent} onPress={() => setAccepted(!accepted)}><Text style={styles.check}>{accepted ? "☑" : "□"}</Text><Text style={styles.small}>Servis talebim için verdiğim bilgilerin işlenmesine, konumumu yalnızca bu talep kapsamında paylaşmaya ve ücret/iptal koşullarının tarafıma gösterilmesine ilişkin bilgilendirmeyi okudum.</Text></TouchableOpacity>
          <Button title="SERVİS TALEBİNİ GÖNDER" onPress={submit} />
          <Button title="TALEBİ İPTAL ET" onPress={() => Alert.alert("Talep iptali", "Bu demo sürümünde canlı talep olmadığı için iptal işlemi örnek olarak gösterilir.", [{text:"Vazgeç"}, {text:"Ana sayfaya dön", onPress:()=>setScreen("home")}])} secondary />
          <Text style={styles.footer}>Talep gönderimi canlı sunucuya bağlı değildir; bu sürüm tanıtım/prototip amaçlıdır.</Text>
        </>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 safe:{flex:1,backgroundColor:"#f4f6f8"}, container:{padding:20,paddingBottom:40},
 header:{backgroundColor:"#101b2b",borderRadius:20,padding:22,marginBottom:22},
 brand:{color:"#fff",fontSize:22,fontWeight:"900",letterSpacing:1}, tagline:{color:"#d6deea",fontSize:14,marginTop:9,lineHeight:21},
 phone:{color:"#8ee0c0",fontSize:17,fontWeight:"800",marginTop:16},
 heading:{fontSize:25,fontWeight:"900",color:"#142238",marginBottom:8}, muted:{fontSize:14,color:"#687589",lineHeight:21,marginBottom:15},
 button:{backgroundColor:"#126b55",padding:17,borderRadius:13,alignItems:"center",marginTop:10},
 buttonText:{color:"#fff",fontWeight:"900",fontSize:15}, secondary:{backgroundColor:"#e5ecef",borderWidth:1,borderColor:"#d1dbe0"},secondaryText:{color:"#1b3545"},
 sectionTitle:{fontSize:17,fontWeight:"900",color:"#17283d",marginTop:24,marginBottom:12},
 grid:{flexDirection:"row",flexWrap:"wrap",gap:8}, service:{backgroundColor:"#fff",padding:13,borderRadius:11,width:"48%",borderWidth:1,borderColor:"#e5eaf0"},serviceText:{color:"#23364d",fontWeight:"700",fontSize:13},
 notice:{backgroundColor:"#fff7e8",padding:15,borderRadius:12,marginTop:22,borderWidth:1,borderColor:"#f1dfb8"},noticeTitle:{fontWeight:"900",color:"#73521b",marginBottom:5},noticeText:{color:"#6e5b3a",lineHeight:20,fontSize:13},
 footer:{color:"#8290a0",fontSize:12,textAlign:"center",marginTop:22,lineHeight:18},back:{color:"#126b55",fontWeight:"800",fontSize:16,marginBottom:18},
 field:{marginBottom:12},label:{fontSize:13,fontWeight:"800",color:"#405168",marginBottom:6},input:{backgroundColor:"#fff",borderWidth:1,borderColor:"#dce3e9",borderRadius:11,padding:13,fontSize:15,color:"#17283d"},
 chips:{flexDirection:"row",flexWrap:"wrap",gap:8},chip:{paddingVertical:9,paddingHorizontal:12,borderRadius:20,backgroundColor:"#e8edf1"},chipOn:{backgroundColor:"#126b55"},chipText:{fontSize:12,color:"#33475e",fontWeight:"700"},chipTextOn:{color:"#fff"},
 price:{fontSize:22,fontWeight:"900",color:"#126b55",marginVertical:7},small:{fontSize:12,color:"#6d7b8c",lineHeight:18},consent:{flexDirection:"row",gap:10,marginTop:18,alignItems:"flex-start"},check:{fontSize:22,color:"#126b55"}
});
