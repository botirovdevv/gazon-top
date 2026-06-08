import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Colors } from '../../src/constants/colors';
import { CalendarIcon, HomeIcon, MapIcon, SettingsIcon } from '../../src/components/ui/Icons';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  // Telefonning pastki qismidagi "Home bar" chizig'ini hisobga olgan holda balandlik
  const tabBarHeight = Platform.OS === 'ios' ? 68 + insets.bottom : 76;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Aktiv matn rangi - rasmda neon yashil
        tabBarActiveTintColor: Colors.neon || '#C8F135', 
        // Aktiv bo'lmagan matn rangi - rasmda och kulrang/yashilsimon xira
        tabBarInactiveTintColor: Colors.textMuted || '#5A5E53',
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
        tabBarStyle: [
          styles.tabBar,
          { 
            height: tabBarHeight,
            paddingBottom: Platform.OS === 'ios' ? insets.bottom + 4 : 12,
          }
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color, focused }) => (
            <TabIconContainer focused={focused}>
              {/* Aktiv bo'lganda ikonka qora rangda, yo'qsa kelayotgan xira rangda */}
              <HomeIcon color={focused ? '#121212' : color} size={22} />
            </TabIconContainer>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: t('tabs.map'),
          tabBarIcon: ({ color, focused }) => (
            <TabIconContainer focused={focused}>
              <MapIcon color={focused ? '#121212' : color} size={22} />
            </TabIconContainer>
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: t('tabs.bookings'),
          tabBarIcon: ({ color, focused }) => (
            <TabIconContainer focused={focused}>
              <CalendarIcon color={focused ? '#121212' : color} size={22} />
            </TabIconContainer>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings'),
          tabBarIcon: ({ color, focused }) => (
            <TabIconContainer focused={focused}>
              <SettingsIcon color={focused ? '#121212' : color} size={22} />
            </TabIconContainer>
          ),
        }}
      />
    </Tabs>
  );
}

// Aktiv ikonka atrofidagi neon to'rtburchak quti
function TabIconContainer({ children, focused }: { children: React.ReactNode; focused: boolean }) {
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    margin: 10,
    borderRadius: 20,
    borderWidth: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)', // Juda ingichka tepa chiziq ajralib turishi uchun
    backgroundColor: '#272525', // Rasmda ko'ringan quyuq fon rangi
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 6,
  },
  iconContainer: {
    width: 46,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: 'transparent',
  },
  iconContainerActive: {
    // Aktiv bo'lganda rasmda to'liq yorqin neon yashil rang berilgan
    backgroundColor: '#C8F135', 
  },
});