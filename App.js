import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
    Heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        borderWidth: 1,
        color: 'white',
        backgroundColor:'blue'
    },
    TextBox: {
        backgroundColor: 'lightgray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 8
    },
    Image: {
        alignSelf: 'center',
        width: 300,
        height: 300,
        marginBottom: 10
    },
    Question: {
        borderWidth: 1,
        marginBottom: 20,
        backgroundColor: '#4e5854'
    },
    Page: {
        backgroundColor: 'black'
    },
    Text: {
        color: 'white'
    }
});

const AnimalQuizApp = () => {
    // State variables for answers, score, and username
    const [selectedAnswers, setSelectedAnswers] = useState(["", "", ""]);
    const [score, setScore] = useState(null);
    const [username, setUsername] = useState(''); // Add state for username

    // Questions array with local image references and answer options
    const questions = [
        {
            image: require('./img/elephant.jpg'),
            correctAnswer: 'Elephant',
            options: ['Tiger', 'Elephant', 'Cow']
        },
        {
            image: require('./img/leopard.jpg'),
            correctAnswer: 'Leopard',
            options: ['Jaguar', 'Cheetah', 'Leopard']
        },
        {
            image: require('./img/owl.jpg'),
            correctAnswer: 'Owl',
            options: ['Parrot', 'Owl', 'Sparrow']
        },
    ];

    // Handle answer selection
    const handleAnswerChange = (value, index) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[index] = value;
        setSelectedAnswers(updatedAnswers);
    };

    // Submit answers and calculate score
    const handleSubmit = () => {
        const calculatedScore = questions.reduce((acc, question, index) => {
            return acc + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
        }, 0);
        setScore(calculatedScore);

        Alert.alert(
            "Quiz Result",
            `${username}, you have ${calculatedScore} correct answer(s)!`,
            [{ text: "OK" }]
        );
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 50 }} style={styles.Page}>
            <Text style={styles.Heading}>Animal Quiz</Text>

            <Text style={styles.Text}>Username:</Text>
            <TextInput
                style={styles.TextBox}
                placeholder="Enter your username"
                onChangeText={(text) => setUsername(text)} // Update username state
                value={username}
            />

            {questions.map((question, index) => (
                <View key={index} style={styles.Question}>
                    <Image
                        source={question.image}
                        style={styles.Image}
                    />
                    <Text style={styles.Text}>What animal is this?</Text>
                    <RNPickerSelect
                        onValueChange={(value) => handleAnswerChange(value, index)}
                        items={question.options.map(option => ({ label: option, value: option }))}
                        placeholder={{ label: 'Select an answer', value: null }}
                        value={selectedAnswers[index]}
                    />
                </View>
            ))}

            <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 20 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Submit Answers</Text>
            </TouchableOpacity>

            {score !== null && (
                <Text style={{ marginTop: 20, fontSize: 18 }}>{username}, you scored: {score} / {questions.length}</Text>
            )}
        </ScrollView>
    );
};

export default AnimalQuizApp;
