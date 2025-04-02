import openai
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class ChatbotView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user_message = request.data.get("message", "")
            
            # Use the current OpenAI API
            client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful mental health assistant. Provide supportive, empathetic responses but clarify you're not a replacement for professional help."},
                    {"role": "user", "content": user_message}
                ]
            )
            
            return Response({"reply": response.choices[0].message.content})
        except Exception as e:
            return Response({"error": str(e)}, status=500)