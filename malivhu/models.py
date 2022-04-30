from django.db import models

class Submission(models.Model):
    job = models.CharField(max_length=50)
    posted = models.DateTimeField()

    class Meta:
        ordering = ['posted']

    def __str__(self):
        return self.job
