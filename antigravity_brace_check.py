
import sys

def count_braces(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    open_braces = content.count('{')
    close_braces = content.count('}')
    
    print(f"File: {file_path}")
    print(f"Open Braces: {open_braces}")
    print(f"Close Braces: {close_braces}")
    
    if open_braces != close_braces:
        print("ALERT: Braces are NOT balanced!")
    else:
        print("Braces are balanced.")

if __name__ == "__main__":
    count_braces(r"e:\Personal Github\Hunger_free_erp\frontend\src\modules\ngo\donations\components\DonationRequests.tsx")
