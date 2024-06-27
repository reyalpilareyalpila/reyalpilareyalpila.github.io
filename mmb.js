import tkinter as tk
from PIL import Image, ImageTk
import qrcode
import requests

def generate_qrcode(url):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    return img

def display_qrcode():
    url = entry.get()
    img = generate_qrcode(url)
    img = img.resize((200, 200), Image.Resampling.LANCZOS)
    img.save("temp_qrcode.png")  # 保存二维码图片到文件
    api_url = "https://mp.jiujiuyingji.cn/api/upload/upload"
       

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

    with open("temp_qrcode.png", "rb") as f:
        files = {"file": f}
        session = requests.Session()
        response = session.post(api_url, headers=headers, files=files)

    data = response.json()
    file_url = data['url']
    print(file_url)

root = tk.Tk()
root.title("二维码生成器")

frame = tk.Frame(root)
frame.pack(padx=10, pady=10)
entry = tk.Entry(frame, width=30)
entry.pack(side=tk.LEFT, padx=5)


button = tk.Button(frame, text="生成二维码", command=display_qrcode)
button.pack(side=tk.LEFT)

label = tk.Label(root)
label.pack(padx=10, pady=10)

root.mainloop()
