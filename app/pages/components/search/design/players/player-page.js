import { Text, Image, ScrollView, Pressable, View } from 'react-native';
import HeaderSection from '../sections/top-section';
import MainSection  from '../sections/main-section';


export default function PlayerPage() {
    return (
        <ScrollView style={{flex: 1}}>
            <HeaderSection />
            <MainSection />
        </ScrollView>
    )
}