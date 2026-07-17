from rest_framework import serializers
from .models import Message
from .models import Conversation



class MessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = "__all__"



class ConversationSerializer(serializers.ModelSerializer):

    class Meta:

        model = Conversation

        fields = "__all__"