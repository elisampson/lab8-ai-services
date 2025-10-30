# R&D: AI Provider Tests

## OpenAI
Connected successfully with valid key.  
Error: "Insufficient quota" – requires paid billing.  
Not usable for free lab testing.

## Google Gemini
Tried multiple endpoints (v1, v1beta, v1beta1) with MakerSuite key.  
Returned "model not found" errors.  
Likely due to newer API version or browser limits.
Update:
With help of classmate, I was able to figure out how to get the correct version of gemini that can be used for this project. So it works correctly now

### Decision
OpenAi failed due to billing, Gemini worked