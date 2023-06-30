import Image from "next/image";

function Message({ mes, user }: any) {
  const showMessage = (content: string): any => {
    const urlPattern =
      /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:\d{2,5})?(\/.*)?$/i;

    if (urlPattern.test(content)) {
      getTitleFromURL(content).then((title) => {
        console.log(title);
      });
    }
    return content;
  };

  async function getTitleFromURL(url: string): Promise<string> {
    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "no-cors",
        headers: {
          Accept: "*/*",
        },
      });
      const html = await response.text();
      const titlePattern = /<title>(.*?)<\/title>/i;
      const match = html.match(titlePattern);

      if (match && match[1]) {
        return match[1];
      } else {
        return url;
      }
    } catch (error) {
      return url;
    }
  }

  return (
    <>
      {mes.user_id === user._id ? (
        <div className="d-flex flex-row-reverse mb-1">
          <div className="friend-avatar"></div>
          <div className="text-white flex-grow-1">
            <div className="text-end">
              <div className="message-text right">
                {showMessage(mes.content)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex your-message mb-1">
          <div className="friend-avatar mr-15">
            <Image
              src="/image/user-4.png"
              alt="friend name"
              width={30}
              height={30}
            />
          </div>
          <div className="text-white flex-grow-1">
            <div className="">
              <span className="message-text left">
                {showMessage(mes.content)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
