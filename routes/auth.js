const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const user = [
  {
    username: 'test',
    password: 'test',
  },
];

router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    const findUser = user.find((user) => user.username === username);

    if (!findUser) {
      return res.status(401).json({
        success: false,
        message: '사용자를 찾을 수 없습니다.',
      });
    }

    if (password !== findUser.password) {
      return res.status(401).json({
        success: false,
        message: '비밀번호가 일치하지 않습니다.',
      });
    }

    const accessToken = jwt.sign(
      {
        username: findUser.username,
      },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h',
      }
    );

    const refreshToken = jwt.sign(
      {
        username: findUser.username,
      },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: '14d',
      }
    );

    return res.status(200).json({
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: '서버 오류',
    });
  }
});

module.exports = router;
