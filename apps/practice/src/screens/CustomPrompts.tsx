import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { CustomPrompt } from '@core/types';
import { customPromptsStore } from '../store/customPromptsStore';

interface EditModalProps {
  visible: boolean;
  prompt: CustomPrompt | null;
  onSave: (title: string, body?: string) => void;
  onCancel: () => void;
}

function EditModal({ visible, prompt, onSave, onCancel }: EditModalProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (prompt) {
      setTitle(prompt.title);
      setBody(prompt.body || '');
    } else {
      setTitle('');
      setBody('');
    }
  }, [prompt]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }
    onSave(title.trim(), body.trim() || undefined);
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{prompt ? 'Edit Prompt' : 'New Prompt'}</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.modalSaveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter prompt title"
              maxLength={100}
              autoFocus
            />
            <Text style={styles.charCount}>{title.length}/100</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={styles.bodyInput}
              value={body}
              onChangeText={setBody}
              placeholder="Enter additional details or instructions"
              multiline
              maxLength={500}
              textAlignVertical="top"
            />
            <Text style={styles.charCount}>{body.length}/500</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default function CustomPrompts() {
  const [prompts, setPrompts] = useState<CustomPrompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<CustomPrompt | null>(null);
  const [showModal, setShowModal] = useState(false);

  const loadPrompts = async () => {
    try {
      const customPrompts = await customPromptsStore.getCustomPrompts();
      // Sort by most recently updated
      customPrompts.sort((a, b) => b.updatedAt - a.updatedAt);
      setPrompts(customPrompts);
    } catch (error) {
      console.error('Error loading custom prompts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPrompts();
    setRefreshing(false);
  };

  useEffect(() => {
    loadPrompts();
  }, []);

  const handleAddPrompt = () => {
    setEditingPrompt(null);
    setShowModal(true);
  };

  const handleEditPrompt = (prompt: CustomPrompt) => {
    setEditingPrompt(prompt);
    setShowModal(true);
  };

  const handleSavePrompt = async (title: string, body?: string) => {
    try {
      if (editingPrompt) {
        await customPromptsStore.updateCustomPrompt(editingPrompt.id, title, body);
      } else {
        await customPromptsStore.addCustomPrompt(title, body);
      }
      setShowModal(false);
      setEditingPrompt(null);
      await loadPrompts();
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to save prompt');
    }
  };

  const handleDeletePrompt = (prompt: CustomPrompt) => {
    Alert.alert(
      'Delete Prompt',
      `Are you sure you want to delete "${prompt.title}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await customPromptsStore.deleteCustomPrompt(prompt.id);
              await loadPrompts();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete prompt');
            }
          },
        },
      ]
    );
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Custom Prompts</Text>
          <Text style={styles.subtitle}>
            Create your own practice prompts to customize your sessions
          </Text>
          <TouchableOpacity style={styles.addButton} onPress={handleAddPrompt}>
            <Text style={styles.addButtonText}>+ Add New Prompt</Text>
          </TouchableOpacity>
        </View>

        {prompts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No custom prompts yet</Text>
            <Text style={styles.emptySubtitle}>
              Create your first custom prompt to personalize your practice sessions
            </Text>
          </View>
        ) : (
          <View style={styles.promptsList}>
            {prompts.map(prompt => (
              <View key={prompt.id} style={styles.promptCard}>
                <View style={styles.promptHeader}>
                  <Text style={styles.promptTitle}>{prompt.title}</Text>
                  <View style={styles.promptActions}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEditPrompt(prompt)}
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeletePrompt(prompt)}
                    >
                      <Text style={styles.deleteButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {prompt.body && <Text style={styles.promptBody}>{prompt.body}</Text>}
                <Text style={styles.promptDate}>
                  {prompt.updatedAt !== prompt.createdAt ? 'Updated' : 'Created'}{' '}
                  {formatDate(prompt.updatedAt)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <EditModal
        visible={showModal}
        prompt={editingPrompt}
        onSave={handleSavePrompt}
        onCancel={() => {
          setShowModal(false);
          setEditingPrompt(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 24,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#7C2D12',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  promptsList: {
    gap: 16,
  },
  promptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#7C2D12',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  promptTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 16,
  },
  promptActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
  },
  editButtonText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#FEF2F2',
    borderRadius: 6,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#EF4444',
    fontWeight: '600',
  },
  promptBody: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  promptDate: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#6B7280',
  },
  modalSaveText: {
    fontSize: 16,
    color: '#7C2D12',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 24,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  bodyInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    height: 120,
  },
  charCount: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 4,
  },
});
