from django.db import models
from pgvector.django import VectorField

# Create your models here.
class Embedding(models.Model):
    uuid = models.UUIDField(primary_key=True)
    embedding = VectorField(dimensions=384)
    document = models.CharField(blank=True)
    convo_id = models.CharField(max_length=100)
    class Meta:
        db_table = 'embedding'


class Conversation(models.Model):
    convo_id = models.CharField(max_length=100)
    convo_name = models.CharField(max_length=100)
    user_id = models.IntegerField()

    class Meta:
        db_table = 'conversation'