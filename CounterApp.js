/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
    addCounter,
    removeCounter,
    incrementCounter,
    decrementCounter,
    resetCounter,
    updateCounterName,
} from './actions';

class CounterApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counterName: '',
            startValue: '',
            editCounterId: null,
            editCounterName: '',
        };
    }

    addCounter = () => {
        const { counterName, startValue } = this.state;
        if (counterName !== '' && startValue !== '') {
            const newCounter = {
                id: Math.random().toString(),
                name: counterName,
                value: parseInt(startValue),
            };
            this.props.addCounter(newCounter);
            this.setState({ counterName: '', startValue: '' });
        }
    };

    removeCounter = (id) => {
        this.props.removeCounter(id);
    };

    incrementCounter = (id) => {
        this.props.incrementCounter(id);
    };

    decrementCounter = (id) => {
        this.props.decrementCounter(id);
    };

    resetCounter = (id) => {
        this.props.resetCounter(id);
    };

    updateCounterName = (id, name) => {
        this.props.updateCounterName(id, name);
        this.setState({ editCounterId: null, editCounterName: '' });
    };

    renderCounter = ({ item }) => {
        const { editCounterId, editCounterName } = this.state;
        const isEditing = editCounterId === item.id;

        return (
            <View style={styles.counterContainer}>
                {isEditing ? (
                    <TextInput
                        style={styles.editInput}
                        value={editCounterName}
                        onChangeText={(text) => this.setState({ editCounterName: text })}
                    />
                ) : (
                    <Text style={styles.counterName}>{item.name}</Text>
                )}
                <View style={styles.counterActions}>
                    <TouchableOpacity
                        style={styles.counterButton}
                        onPress={() => this.decrementCounter(item.id)}
                    >
                        <Text style={styles.counterButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterValue}>{item.value}</Text>
                    <TouchableOpacity
                        style={styles.counterButton}
                        onPress={() => this.incrementCounter(item.id)}
                    >
                        <Text style={styles.counterButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.resetButton}
                    onPress={() => this.resetCounter(item.id)}
                >
                    <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                {isEditing ? (
                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress={() => this.updateCounterName(item.id, editCounterName)}
                    >
                        <Text style={styles.updateButtonText}>Update</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => this.setState({ editCounterId: item.id, editCounterName: item.name })}
                    >
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => this.removeCounter(item.id)}
                >
                    <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Counter Name"
                        value={this.state.counterName}
                        onChangeText={(text) => this.setState({ counterName: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Start Value"
                        keyboardType="numeric"
                        value={this.state.startValue}
                        onChangeText={(text) => this.setState({ startValue: text })}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={this.addCounter}>
                        <Text style={styles.addButtonText}>Add Counter</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.props.counters}
                    renderItem={this.renderCounter}
                    keyExtractor={(item) => item.id}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    counters: state.counters,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    counterContainer: {
        marginBottom: 20,
    },
    counterName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    counterActions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    counterButton: {
        backgroundColor: 'blue',
        padding: 10,
        marginRight: 10,
    },
    counterButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    counterValue: {
        fontSize: 16,
        marginRight: 10,
    },
    resetButton: {
        backgroundColor: 'gray',
        padding: 10,
        marginRight: 10,
    },
    resetButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    editButton: {
        backgroundColor: 'orange',
        padding: 10,
        marginRight: 10,
    },
    editButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    editInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    updateButton: {
        backgroundColor: 'green',
        padding: 10,
        marginRight: 10,
    },
    updateButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    removeButton: {
        backgroundColor: 'red',
        padding: 10,
    },
    removeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default connect(mapStateToProps, {
    addCounter,
    removeCounter,
    incrementCounter,
    decrementCounter,
    resetCounter,
    updateCounterName,
})(CounterApp);
